// homepage.tsx
import { useEffect, useState } from "react";
import { getAllPosts, getFollowerPosts } from "~/api/routes/post";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { useLocation } from "react-router-dom";
import PostFeed from "../components/PostFeed";
import StyledNavLink from "~/components/StyledNavLink";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [emptyMessage, setEmptyMessage] = useState("");
    const location = useLocation();

    let currentUser = useSelector((state: RootState) => state.userReducer.user);

    const handleGetAllPosts = async () => {
        setEmptyMessage(
            "It looks like no one has ever posted. Be the first to post!"
        );
        try {
            const data = await getAllPosts();
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetFollowerPosts = async () => {
        setEmptyMessage("Follow other accounts to populate this feed.");
        try {
            if (currentUser) {
                const data = await getFollowerPosts(currentUser.id);
                setPosts(data);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const path = location.pathname.split("/").pop();
        if (path === "following") {
            handleGetFollowerPosts();
        } else {
            handleGetAllPosts();
        }
    }, [location.pathname]);

    return (
        <div className="space-y-4">
            <h3>Home</h3>
            <hr />
            <div className="flex space-x-4">
                <StyledNavLink
                    to="/feed"
                    label="For You"
                    pendingClasses="text-black"
                    activeClasses="text-black border-b-2 border-salmon"
                    end
                />
                <StyledNavLink
                    to="/feed/following"
                    label="Following"
                    pendingClasses="text-black"
                    activeClasses="text-black border-b-2 border-salmon"
                />
            </div>

            <PostFeed
                posts={posts}
                setPosts={setPosts}
                emptyMessage={emptyMessage}
            />
        </div>
    );
}
