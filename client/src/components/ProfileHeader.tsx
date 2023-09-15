import { SubmitButton } from "./Buttons";

export default function ProfileHeader() {
    return (
        <div className="flex flex-row rounded-xl drop-shadow-xl py-6 px-8 bg-white items-center justify-between">
            <div className="flex flex-row items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-salmon"></div>
                <div className="flex flex-col space-y-2">
                    <h3>marshall</h3>
                    <div className="flex flex-row">
                        <SubmitButton
                            label="follow"
                            onClick={() => console.log("hi")}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-1 items-center">
                    <h3>20</h3>
                    <p>posts</p>
                </div>
                <div className="border-l" />
                <div className="flex flex-col space-y-1 items-center">
                    <h3>1k</h3>
                    <p>saves</p>
                </div>
                <div className="border-l" />
                <div className="flex flex-col space-y-1 items-center">
                    <h3>100</h3>
                    <p>followers</p>
                </div>
                <div className="border-l" />
                <div className="flex flex-col space-y-1 items-center">
                    <h3>100</h3>
                    <p>following</p>
                </div>
            </div>
        </div>
    );
}
