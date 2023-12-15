import { useState } from "react";
import { ButtonGroup } from "../components/Buttons";
import Feed from "../Feed";

export default function HomePage() {
    const [feed, setFeed] = useState("for you");
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
                        onClick: () => setFeed("for you"),
                    },
                    {
                        label: "Following",
                        value: "following",
                        onClick: () => setFeed("following"),
                    },
                ]}
                value={feed}
            />

            <Feed type={feed} />
        </div>
    );
}
