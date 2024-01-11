import { ButtonGroup } from "../components/Buttons";
import Feed from "../components/Feed";
import { samplePostData } from "~/utils/sampleData";

export default function HomePage() {
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
                        onClick: () =>
                            console.log("handle for you population here"),
                    },
                    {
                        label: "Following",
                        value: "following",
                        onClick: () =>
                            console.log("handle following population here"),
                    },
                ]}
            />

            <Feed posts={samplePostData} />
        </div>
    );
}
