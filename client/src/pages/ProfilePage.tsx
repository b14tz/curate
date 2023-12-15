import Feed from "../Feed";
import Header from "../components/profile/Header";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <Header />
            <Feed type="spotify" />
        </div>
    );
}
