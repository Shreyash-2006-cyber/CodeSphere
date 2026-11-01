import { LuMapPin, LuCalendar, LuGithub } from "react-icons/lu";
import Avatar from "../../../shared/components/Avatar";
import Card from "../../../shared/components/Card";
import { formatDate } from "../../../shared/utils/formatDate";

export default function ProfileCard({ profile }) {
  return (
    <Card className="gh-profile-card">
      <div className="gh-profile-top">
        <Avatar name={profile.name} size={64} />
        <div>
          <h3>{profile.name}</h3>
          <p className="gh-username"><LuGithub /> @{profile.username}</p>
        </div>
      </div>
      <p className="gh-bio">{profile.bio}</p>
      <div className="gh-meta">
        <span><LuMapPin /> {profile.location}</span>
        <span><LuCalendar /> Joined {formatDate(profile.joined, { year: "numeric", month: "long" })}</span>
      </div>
    </Card>
  );
}
