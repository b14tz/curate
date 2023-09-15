import { useState } from "react";
import { ButtonGroup } from "../components/Buttons";
import Feed from "../Feed";

export default function FeedPage() {
    const [feed, setFeed] = useState("spotify");
    return (
        <div className="space-y-4">
            <h3>feed</h3>
            <hr />
            <ButtonGroup
                buttonClasses=""
                groupClasses="space-x-8"
                activeClasses=" border-b-2 border-solid border-salmon"
                groupButtons={[
                    {
                        label: "spotify",
                        value: "spotify",
                        onClick: () => setFeed("spotify"),
                    },
                    {
                        label: "friends",
                        value: "friends",
                        onClick: () => setFeed("friends"),
                    },
                    {
                        label: "popular",
                        value: "popular",
                        onClick: () => setFeed("popular"),
                    },
                ]}
                value={feed}
            />

            {feed === "spotify" ? (
                <p>a collection of playlists recommended by spotify</p>
            ) : feed === "friends" ? (
                <p>playlists posted by your friends</p>
            ) : (
                <p>the latest and greatest playlists on the site</p>
            )}

            <Feed type={feed} />
        </div>
    );
}
