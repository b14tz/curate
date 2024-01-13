import { useEffect, useState } from "react";
import { ButtonGroup } from "../components/ButtonGroup";
import Feed from "../components/Feed";
import { populateSpotifyFeed } from "~/api/routes/spotify";

export default function DiscoverPage() {
    const [posts, setPosts] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState("");

    useEffect(() => {
        populateSpotifyPosts();
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

            <Feed posts={posts} emptyMessage={emptyMessage} />
        </div>
    );
}
