const axios = require("axios");
const mongoose = require("mongoose");
const GitHub = require("../models/github");

const getGithubProfile = async (userId, username) => {
    try {

        const userUrl = `https://api.github.com/users/${username}`;
        const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

        const token = process.env.GITHUB_TOKEN;
        console.log("🔍 DEBUG GITHUB_TOKEN:", JSON.stringify(token), "type:", typeof token, "length:", token ? token.length : 0);

        const ghHeaders = {
            "User-Agent": "CodeSphere-App",
            ...(token && {
                "Authorization": `Bearer ${token}`
            })
        };
        console.log("🔍 DEBUG headers:", JSON.stringify(ghHeaders));

        const [userRes, reposRes] = await Promise.all([
            axios.get(userUrl, { headers: ghHeaders }).catch(err => {
                console.error("🔴 GitHub user API error:", err.response?.status, err.response?.data);
                throw err;
            }),
            axios.get(reposUrl, { headers: ghHeaders }).catch((err) => {
                console.error("🔴 GitHub repos API error:", err.response?.status, err.response?.data);
                return { data: [] };
            })
        ]);

        const data = userRes.data;
        const reposData = Array.isArray(reposRes.data) ? reposRes.data : [];

        const totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

        const repositories = reposData.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || "No description provided.",
            language: r.language || "Other",
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            updated: r.updated_at ? r.updated_at.split("T")[0] : new Date().toISOString().split("T")[0],
            htmlUrl: r.html_url
        }));

        const langCounts = {};
        reposData.forEach((r) => {
            if (r.language) {
                langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            }
        });
        const totalWithLang = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
        const langColors = {
            JavaScript: "#f1e05a",
            TypeScript: "#3178c6",
            Python: "#3572A5",
            HTML: "#e34c26",
            CSS: "#563d7c",
            "C++": "#f34b7d",
            Java: "#b07219",
            Go: "#00ADD8",
            Rust: "#dea584",
            Shell: "#89e051"
        };
        const languages = Object.entries(langCounts)
            .map(([name, count]) => ({
                name,
                value: Math.round((count / totalWithLang) * 100),
                color: langColors[name] || "#94a3b8"
            }))
            .sort((a, b) => b.value - a.value);

        const validUserId = mongoose.Types.ObjectId.isValid(userId)
            ? userId
            : "60c72b2f9b1d8b2b88e8e8a1";

        let contributionsData = [];
        let weeklyCommitsData = {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            data: [0, 0, 0, 0, 0, 0, 0]
        };

        try {
            const contribRes = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}`, { timeout: 5000 });
            if (contribRes.data && Array.isArray(contribRes.data.contributions)) {
                const contribs = contribRes.data.contributions;
                contribs.sort((a, b) => new Date(a.date) - new Date(b.date));
                contributionsData = contribs.slice(-126).map(c => c.count);

                const weekdayCounts = [0, 0, 0, 0, 0, 0, 0]; // Sun=0, Mon=1, ..., Sat=6
                contribs.forEach(c => {
                    if (c.count > 0) {
                        const day = new Date(c.date).getDay();
                        weekdayCounts[day] += c.count;
                    }
                });

                weeklyCommitsData.data = [
                    weekdayCounts[1], // Mon
                    weekdayCounts[2], // Tue
                    weekdayCounts[3], // Wed
                    weekdayCounts[4], // Thu
                    weekdayCounts[5], // Fri
                    weekdayCounts[6], // Sat
                    weekdayCounts[0], // Sun
                ];
            }
        } catch (apiErr) {
            console.warn("⚠️ GitHub contributions fetch failed, falling back to database:", apiErr.message);
        }

        if (contributionsData.length === 0) {
            const existing = await GitHub.findOne({ userId: validUserId });
            if (existing && existing.contributions && existing.contributions.length > 0) {
                contributionsData = existing.contributions;
                weeklyCommitsData = existing.weeklyCommits || weeklyCommitsData;
            }
        }

        const githubData = {
            userId: validUserId,
            username: data.login,
            followers: data.followers,
            following: data.following,
            publicRepos: data.public_repos,
            avatar: data.avatar_url,
            bio: data.bio,
            location: data.location,
            profileUrl: data.html_url,
            totalStars,
            repositories,
            languages,
            contributions: contributionsData,
            weeklyCommits: weeklyCommitsData,
            lastUpdated: new Date()
        };

        try {
            const savedData = await GitHub.findOneAndUpdate(
                { userId: validUserId },
                githubData,
                {
                    returnDocument: "after",
                    upsert: true
                }
            );
            return savedData;
        } catch (dbErr) {
            console.warn("⚠️ MongoDB save bypassed:", dbErr.message);
            return githubData;
        }

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getGithubProfile
};