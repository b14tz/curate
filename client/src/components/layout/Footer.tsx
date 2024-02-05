import "remixicon/fonts/remixicon.css";
import { Separator } from "../ui/separator";

export default function Footer() {
    function renderCurrentYear() {
        const year = new Date();
        return year.getFullYear();
    }

    return (
        <div className="">
            <Separator />
            <div className="flex flex-row">
                <p>
                    <i className="ri-copyright-line"></i> Curate{" "}
                    {renderCurrentYear()}
                </p>
            </div>
        </div>
    );
}
