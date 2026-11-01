import { useEffect, useState } from "react";
import FriendCard from "./components/FriendCard";
import RequestCard from "./components/RequestCard";
import CompareChart from "./components/CompareChart";
import ActivityFeed from "./components/ActivityFeed";
import { friendActivity, comparisonData } from "./data/friendsMockData";
import { communityAPI } from "../../shared/services/communityAPI";
import { useToast } from "../../shared/components/Toast";
import EmptyState from "../../shared/components/EmptyState";
import { SkeletonCard } from "../../shared/components/Loader";
import Button from "../../shared/components/Button";
import Avatar from "../../shared/components/Avatar";
import Card from "../../shared/components/Card";
import { LuUserPlus, LuUserCheck, LuClock } from "react-icons/lu";
import "./styles/Friends.css";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  async function loadData() {
    try {
      setLoading(true);
      const [friendsRes, requestsRes] = await Promise.all([
        communityAPI.getFriends(),
        communityAPI.getFriendRequests(),
      ]);

      if (friendsRes.success && friendsRes.data) {
        setFriends(friendsRes.data.friends || []);
        setSuggested(friendsRes.data.suggested || []);
      }
      if (requestsRes.success && requestsRes.data) {
        setRequests(requestsRes.data);
      }
    } catch (err) {
      console.error("Failed to load community data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function accept(id) {
    try {
      const res = await communityAPI.respondFriendRequest(id, "accept");
      if (res.success) {
        showToast("Friend request accepted", "success");
        loadData();
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to accept request", "error");
    }
  }

  async function decline(id) {
    try {
      const res = await communityAPI.respondFriendRequest(id, "decline");
      if (res.success) {
        showToast("Friend request declined", "info");
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to decline request", "error");
    }
  }

  async function handleSendRequest(userId) {
    try {
      const res = await communityAPI.sendFriendRequest(userId);
      if (res.success) {
        showToast("Friend request sent!", "success");
        setSuggested((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, requestPending: true } : u))
        );
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to send request", "error");
    }
  }

  return (
    <div className="fr-page fade-in">
      <div className="page-heading">
        <h2>Friends & Community</h2>
        <p>Study together, compare progress, and connect with other developers.</p>
      </div>

      {requests.length > 0 && (
        <div className="page-section">
          <h3>Friend requests</h3>
          <div className="fr-requests-grid">
            {requests.map((r) => (
              <RequestCard key={r.id} request={r} onAccept={accept} onDecline={decline} />
            ))}
          </div>
        </div>
      )}

      <div className="page-section">
        <h3>Your friends ({friends.length})</h3>
        {loading ? (
          <div className="fr-grid">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        ) : friends.length === 0 ? (
          <EmptyState icon={LuUserPlus} title="No connected friends yet" description="Send a friend request to other users below to compare progress." />
        ) : (
          <div className="fr-grid">
            {friends.map((f) => (
              <FriendCard key={f.id} friend={f} />
            ))}
          </div>
        )}
      </div>

      {suggested.length > 0 && (
        <div className="page-section">
          <h3>Discover Developers ({suggested.length})</h3>
          <div className="fr-grid">
            {suggested.map((user) => (
              <Card key={user.id} className="fr-card">
                <div className="fr-card-top">
                  <Avatar name={user.name} size={44} />
                  <div>
                    <h4>{user.name}</h4>
                    <span className="fr-points">@{user.username}</span>
                  </div>
                </div>
                <div className="fr-card-meta" style={{ marginTop: 10, marginBottom: 12 }}>
                  <span>{user.problemsSolved} problems solved</span>
                  <span>{user.repos} repos</span>
                </div>
                {user.requestPending ? (
                  <Button variant="ghost" size="sm" icon={LuClock} disabled fullWidth>
                    Request Pending
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" icon={LuUserPlus} onClick={() => handleSendRequest(user.id)} fullWidth>
                    Add Friend
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-2 page-section">
        <CompareChart data={comparisonData} friendName={friends[0]?.name || "Developer"} />
        <ActivityFeed activity={friendActivity} />
      </div>
    </div>
  );
}
