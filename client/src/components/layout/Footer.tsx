import "remixicon/fonts/remixicon.css";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <div className="">
            <Separator />
            <div className="flex flex-row justify-center items-center mt-2 space-x-4">
                <p className="text-sm">
                    Made by{" "}
                    <a href="https://bla.tz" className="hover:underline">
                        Marshall
                    </a>
                </p>
                <p>●</p>
                <Button
                    variant="link"
                    className="w-fit p-0 text-white font-normal"
                    onClick={() => navigate("/privacy-policy")}
                >
                    Privacy
                </Button>
                <Button
                    variant="link"
                    className="w-fit p-0 text-white font-normal"
                    onClick={() => navigate("/terms-of-service")}
                >
                    Terms
                </Button>
            </div>
        </div>
    );
}
