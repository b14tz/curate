import { samplePostData } from "~/utils/sampleData";
import Feed from "../components/Feed";
import Header from "~/components/profile/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { getUser } from "~/api/routes/user";
import { useEffect, useState } from "react";

export default function UserPage() {
    const { id } = useParams();
    const [userData, setUserData] = useState<User>({
        id: "",
        token: "",
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        bio: "",
        connectedToSpotify: false,
        connectedToApple: false,
    });

    let currentUser = useSelector((state: RootState) => state.user);
    const isCurrentUser = id === currentUser?.id;

    useEffect(() => {
        async function populateUser() {
            if (!isCurrentUser && id) {
                const fetchedUser = await getUser(id);
                setUserData(fetchedUser);
            } else {
                currentUser && setUserData(currentUser);
            }
        }
        populateUser();
    }, [id, isCurrentUser]);

    return (
        <div className="space-y-8">
            <Header user={userData} isCurrentUser={isCurrentUser} />
            <Feed posts={samplePostData} />
        </div>
    );
}
