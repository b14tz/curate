import { useState } from "react";
import { ButtonGroup } from "../components/Buttons";
import Feed from "../Feed";

export default function FeedPage() {
    const [feed, setFeed] = useState("spotify");
    return (
        <div className="space-y-4">
            <p>feed</p>
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
            <Feed type={feed} />
        </div>
    );
}
