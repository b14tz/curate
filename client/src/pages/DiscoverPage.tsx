import { useState } from "react";
import { ButtonGroup } from "../components/Buttons";
import Feed from "../Feed";

export default function DiscoverPage() {
    const [feed, setFeed] = useState("spotify");
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
                        onClick: () => setFeed("spotify"),
                    },
                    {
                        label: "Apple",
                        value: "apple",
                        onClick: () => setFeed("apple"),
                    },
                ]}
                value={feed}
            />

            <Feed type={feed} />
        </div>
    );
}
