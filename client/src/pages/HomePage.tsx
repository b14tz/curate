import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

import {
    useGetAllPostsQuery,
    useGetFollowerPostsQuery,
} from "@/redux/api/routes/post";
import { RootState } from "@/redux/store";
import PostFeed from "../components/PostFeed";
import StyledNavLink from "@/components/StyledNavLink";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
    const location = useLocation();
    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );

    const {
        data: allPosts,
        isLoading: isLoadingAllPosts,
        error: allPostsError,
    } = useGetAllPostsQuery();

    const {
        data: followerPosts,
        isLoading: isLoadingFollowerPosts,
        error: followerPostsError,
    } = useGetFollowerPostsQuery(currentUser?.id ?? skipToken);

    const emptyMessage = location.pathname.includes("/following")
        ? "Follow other accounts to populate this feed."
        : "It looks like no one has ever posted. Be the first to post!";

    const postsToShow = location.pathname.includes("/following")
        ? followerPosts
        : allPosts;

    const isLoading = location.pathname.includes("/following")
        ? isLoadingFollowerPosts
        : isLoadingAllPosts;

    const error = location.pathname.includes("/following")
        ? followerPostsError
        : allPostsError;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching posts</div>;

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Separator />
                <div className="flex space-x-4">
                    <StyledNavLink
                        to="/feed"
                        label="For You"
                        pendingClasses=""
                        activeClasses="border-b-2 border-primary"
                        end
                    />
                    <StyledNavLink
                        to="/feed/following"
                        label="Following"
                        pendingClasses=""
                        activeClasses="border-b-2 border-primary"
                    />
                </div>
            </div>
            <PostFeed posts={postsToShow ?? []} emptyMessage={emptyMessage} />
        </div>
    );
}
