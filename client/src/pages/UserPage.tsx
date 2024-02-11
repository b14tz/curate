import Feed from "../components/PostFeed";
import Header from "@/components/user/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import {
    isSpotifyTokenExpired,
    updateAccessToken,
} from "@/redux/features/spotify/spotifySlice";
import { refreshAccessToken } from "@/api/routes/spotify";
import { useGetUserPostsQuery } from "@/redux/api/routes/post";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetUserQuery } from "@/redux/api/routes/user";
import UserPageSkeleton from "@/components/skeletons/UserPageSkeleton";

export default function UserPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );

    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );

    const {
        data: user,
        isLoading: isLoadingUser,
        error: userError,
    } = useGetUserQuery(id ?? skipToken);

    const {
        data: posts,
        isLoading: isLoadingPosts,
        error: postsError,
    } = useGetUserPostsQuery(id ?? skipToken);

    const isCurrentUser = id === currentUser?.id;

    const ensureValidSpotifyToken = async () => {
        if (isSpotifyTokenExpired(spotifyToken) && spotifyToken.refreshToken) {
            const data = await refreshAccessToken(spotifyToken.refreshToken);
            await dispatch(
                updateAccessToken({
                    accessToken: data.accessToken,
                    expirationTime: data.expirationTime,
                    refreshToken: data.refreshToken,
                })
            );
        }
    };

    useEffect(() => {
        ensureValidSpotifyToken();
    }, [id, spotifyToken]);

    if (isLoadingPosts || isLoadingUser) return <UserPageSkeleton />;
    if (postsError) return <div>Error fetching posts</div>;
    if (userError || !user) return <div>Error fetching user</div>;

    return (
        <>
            <div className="space-y-8">
                <Header user={user} isCurrentUser={isCurrentUser} />
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
