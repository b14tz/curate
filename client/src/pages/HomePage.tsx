// homepage.tsx
import { useEffect, useState } from "react";
import { ButtonGroup } from "../components/ButtonGroup";
import Feed from "../components/Feed";
import { getAllFollowerPosts, getAllPosts } from "~/api/routes/post";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [emptyMessage, setEmptyMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    let currentUser = useSelector((state: RootState) => state.userReducer.user);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        let path = searchParams.get("path");
        let token = searchParams.get("token");

        // Set default path to 'spotify' if none is specified
        if (!(token || path)) {
            navigate("?path=for%20you");
            path = "for you";
        }

        if (path === "for you" || !path) {
            handleGetAllPosts();
        } else if (path === "following") {
            handleGetAllFollowerPosts();
        }
    }, [location]);

    const handleGetAllPosts = async () => {
        setEmptyMessage(
            "It looks like no one has ever posted. Be the first to post!"
        );
        try {
            const data = await getAllPosts();
            console.log(data);
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetAllFollowerPosts = async () => {
        setEmptyMessage("Follow other accounts to populate this feed.");
        try {
            if (currentUser) {
                const data = await getAllFollowerPosts(currentUser.id);

                console.log("following posts: ", data);
                setPosts(data);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                        value: "for you",
                        onClick: () => handleGetAllPosts(),
                    },
                    {
                        label: "Following",
                        value: "following",
                        onClick: () => handleGetAllFollowerPosts(),
                    },
                ]}
            />

            <Feed
                posts={posts}
                setPosts={setPosts}
                emptyMessage={emptyMessage}
            />
        </div>
    );
}
