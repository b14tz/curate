import { useEffect, useState } from "react";
import { ButtonGroup } from "../components/ButtonGroup";
import Feed from "../components/Feed";
import { populateSpotifyFeed } from "~/api/routes/spotify";
import { useLocation, useNavigate } from "react-router-dom";

export default function DiscoverPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [emptyMessage, setEmptyMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        let path = searchParams.get("path");

        // Set default path to 'spotify' if none is specified
        if (!path) {
            navigate("?path=spotify");
            path = "spotify";
        }

        if (path === "spotify") {
            populateSpotifyPosts();
        } else if (path === "apple") {
            populateApplePosts();
        }
    }, []);

    async function populateSpotifyPosts() {
        setEmptyMessage(
            "It looks like there aren't any spotify recommendations at this time."
        );
        const data = await populateSpotifyFeed();
        setPosts(data);
    }

    async function populateApplePosts() {
        setEmptyMessage(
            "It looks like there aren't any apple recommendations at this time."
        );
        setPosts([]);
    }

    return (
        <div className="space-y-4">
            <h3>Discover</h3>
            <hr />
            <ButtonGroup
                buttonClasses=""
                groupClasses="space-x-8"
                activeClasses=" border-b-2 border-solid border-salmon"
                groupButtons={[
                    {
                        label: "Spotify",
                        value: "spotify",
                        onClick: async () => {
                            await populateSpotifyPosts();
                        },
                    },
                    {
                        label: "Apple",
                        value: "apple",
                        onClick: () => {
                            populateApplePosts();
                        },
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
