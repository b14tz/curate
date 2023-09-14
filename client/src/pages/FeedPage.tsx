import { ButtonGroup } from "../components/Buttons";

export default function FeedPage() {
    return (
        <div className="space-y-4">
            <p>feed</p>
            <hr />
            <ButtonGroup
                buttonClasses=""
                groupClasses="space-x-8"
                groupButtons={[
                    { label: "spotify", onClick: () => console.log("spotify") },
                    { label: "friends", onClick: () => console.log("friends") },
                    { label: "popular", onClick: () => console.log("popular") },
                ]}
                value=""
            />
        </div>
    );
}
