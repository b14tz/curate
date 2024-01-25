// homepage.tsx
import { useEffect, useState } from "react";
import { ButtonGroup } from "../components/ButtonGroup";
import { getAllPosts, getFollowerPosts } from "~/api/routes/post";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import PostFeed from "../components/PostFeed";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [emptyMessage, setEmptyMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    let currentUser = useSelector((state: RootState) => state.userReducer.user);

    const handleGetAllPosts = async () => {
        setEmptyMessage(
            "It looks like no one has ever posted. Be the first to post!"
        );
        try {
            const data = await getAllPosts();
            setPosts(data);
            //console.log("Posts: ", data);
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
            <ButtonGroup
                buttonClasses=""
                groupClasses="space-x-8"
                activeClasses=" border-b-2 border-solid border-salmon"
                groupButtons={[
                    {
                        label: "For You",
                        value: "for-you",
                        onClick: () => navigate("/"),
                    },
                    {
                        label: "Following",
                        value: "following",
                        onClick: () => navigate("/following"),
                    },
                ]}
            />

            <PostFeed
                posts={posts}
                setPosts={setPosts}
                emptyMessage={emptyMessage}
            />
        </div>
    );
}
