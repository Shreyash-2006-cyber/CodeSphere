import { LuMapPin, LuCalendar, LuPencil } from "react-icons/lu";
import Card from "../../../shared/components/Card";
import Avatar from "../../../shared/components/Avatar";
import Button from "../../../shared/components/Button";
import { formatDate } from "../../../shared/utils/formatDate";

export default function ProfileHeader({ profile }) {
  return (
    <Card className="pf-header">
      <Avatar name={profile.name} size={80} />
      <div className="pf-header-info">
        <div className="pf-header-top">
          <div>
            <h2>{profile.name}</h2>
            <p className="pf-username">@{profile.username}</p>
          </div>
          <Button variant="outline" size="sm" icon={LuPencil}>Edit profile</Button>
        </div>
        <p className="pf-bio">{profile.bio}</p>
        <div className="pf-meta">
          <span><LuMapPin /> {profile.location}</span>
          <span><LuCalendar /> Joined {formatDate(profile.joined, { year: "numeric", month: "long" })}</span>
        </div>
      </div>
    </Card>
  );
}
