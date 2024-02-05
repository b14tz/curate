import Feed from "../components/PostFeed";
import Header from "@/components/user/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUser } from "@/api/routes/user";
import { useEffect, useState } from "react";
import {
    isSpotifyTokenExpired,
    updateAccessToken,
} from "@/redux/features/spotify/spotifySlice";
import { getExpirationTime } from "@/utils/time";
import { refreshAccessToken } from "@/api/routes/spotify";
import { useGetUserPostsQuery } from "@/redux/api/routes/post";
import { skipToken } from "@reduxjs/toolkit/query";

export default function UserPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

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

    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );
    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );

    const {
        data: posts,
        isLoading,
        error,
    } = useGetUserPostsQuery(id ?? skipToken);

    const isCurrentUser = id === currentUser?.id;

    const ensureValidSpotifyToken = async () => {
        if (isSpotifyTokenExpired(spotifyToken) && spotifyToken.refreshToken) {
            const data = await refreshAccessToken(spotifyToken.refreshToken);
            const expirationTime = getExpirationTime(data.expires_in);
            await dispatch(
                updateAccessToken({
                    accessToken: data.access_token,
                    expirationTime: expirationTime,
                })
            );
        }
    };

    useEffect(() => {
        async function populateUser() {
            ensureValidSpotifyToken();
            if (id && currentUser) {
                const fetchedUser = await getUser(id);
                setUserData(fetchedUser);
            }
        }
        populateUser();
    }, [id, currentUser]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching posts</div>;

    return (
        <>
            <div className="space-y-8">
                <Header
                    user={userData}
                    setUser={setUserData}
                    isCurrentUser={isCurrentUser}
                />
                <Feed
                    posts={posts ?? []}
                    emptyMessage={
                        isCurrentUser
                            ? "You haven't posted yet. What are you waiting for?"
                            : "This user hasn't posted yet."
                    }
                />
            </div>
        </>
    );
}
