import "remixicon/fonts/remixicon.css";
import { Separator } from "../ui/separator";

export default function Footer() {
    // function renderCurrentYear() {
    //     const year = new Date();
    //     return year.getFullYear();
    // }

    return (
        <div className="">
            <Separator />
            <div className="flex flex-row justify-center">
                <p className="mt-4">
                    Made by{" "}
                    <a href="https://blatz.io" className="underline">
                        Marshall
                    </a>
                </p>
            </div>
        </div>
    );
}
