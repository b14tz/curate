import { useState } from "react";
import { ButtonGroup } from "../components/Buttons";
import Feed from "../components/Feed";
import { samplePostData } from "~/utils/sampleData";
import { populateSpotifyFeed } from "~/api/routes/spotify";

export default function DiscoverPage() {
    const [posts, setPosts] = useState(samplePostData);

    async function populateSpotifyPosts() {
        const data = await populateSpotifyFeed();
        setPosts(data);
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
                            setPosts(samplePostData);
                        },
                    },
                ]}
            />

            <Feed posts={posts} />
        </div>
    );
}
