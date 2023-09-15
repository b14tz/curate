import Feed from "../Feed";
import ProfileHeader from "../components/ProfileHeader";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <ProfileHeader />
            <Feed type="spotify" />
        </div>
    );
}
