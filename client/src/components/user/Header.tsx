import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SettingsModal from "../SettingsModal";
import { Button } from "../ui/button";
import modpfp from "@/assets/pfp-marsh.png";
import pfp from "@/assets/pfp.png";
import {
    useCreateFollowMutation,
    useDeleteFollowMutation,
} from "@/redux/api/routes/follow";

export default function Header({
    user,
    isCurrentUser,
}: {
    user: User;
    isCurrentUser: boolean;
}) {
    const { enqueueSnackbar } = useSnackbar();
    const [isFollowing, setIsFollowing] = useState(true);
    const [createFollow] = useCreateFollowMutation();
    const [deleteFollow] = useDeleteFollowMutation();
    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );

    useEffect(() => {
        console.log(user.following);
        setIsFollowing(
            user.following?.some(
                (follower) =>
                    currentUser &&
                    follower.followerId === currentUser.id &&
                    follower.followingId === user.id
            ) || false
        );
    }, [user, currentUser]);

    const handleFollow = async () => {
        if (currentUser) {
            await createFollow({
                followerId: currentUser.id,
                followingId: user.id,
            }).unwrap();
            setIsFollowing(true);
        } else {
            enqueueSnackbar("You must be logged in to follow users.", {
                autoHideDuration: 2000,
            });
        }
    };

    const handleUnfollow = async () => {
        if (currentUser) {
            await deleteFollow({
                followerId: currentUser.id,
                followingId: user.id,
            }).unwrap();
            setIsFollowing(false);
        }
    };

    return (
        <div>
            <div className="flex flex-row items-center justify-between pt-2 pb-4">
                <div className="flex flex-row items-center space-x-4">
                    <img
                        className="w-20 h-20 rounded-full bg-primary"
                        src={user.displayName === "marsh" ? modpfp : pfp}
                    />
                    <div className="flex flex-col space-y-2">
                        <h3>{user?.displayName}</h3>
                        <div className="flex flex-row">
                            {isCurrentUser ? (
                                <SettingsModal user={user}>
                                    <Button variant="secondary">
                                        Settings
                                    </Button>
                                </SettingsModal>
                            ) : isFollowing ? (
                                <Button
                                    variant="outline"
                                    onClick={() => handleUnfollow()}
                                >
                                    Unfollow
                                </Button>
                            ) : (
                                <Button onClick={() => handleFollow()}>
                                    Follow
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col items-center">
                        <h3>{user.posts?.length || 0}</h3>
                        <p>Posts</p>
                    </div>
                    <div className="border-l" />
                    <div className="flex flex-col items-center">
                        <h3>{user.saves}</h3>
                        <p>Saves</p>
                    </div>
                    <div className="border-l" />
                    <div className="flex flex-col items-center">
                        <h3>{user.followers?.length || 0}</h3>
                        <p>Followers</p>
                    </div>
                    <div className="border-l" />
                    <div className="flex flex-col items-center">
                        <h3>{user.following?.length || 0}</h3>
                        <p>Following</p>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}
