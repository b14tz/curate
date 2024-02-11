import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

function simulateEscKeyPress() {
    const event = new KeyboardEvent("keydown", {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        which: 27,
        bubbles: true,
    });
    document.dispatchEvent(event);
}

export default function AuthModal({ children }: { children: JSX.Element }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[400px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <Button
                    variant={"secondary"}
                    className="flex space-x-4"
                    onClick={() => {
                        window.location.href = `${
                            import.meta.env.VITE_SERVER_URL
                        }/auth/google`;
                    }}
                >
                    <IconBrandGoogleFilled />
                    <p>Login with Google</p>
                </Button>
                <DialogDescription className="text-xs">
                    By logging in, you agree to Jookbox's{" "}
                    <Link
                        to="/terms-of-service"
                        className="underline"
                        onClick={simulateEscKeyPress}
                    >
                        terms of service
                    </Link>
                    {" and "}
                    <Link
                        to="/privacy-policy"
                        className="underline"
                        onClick={simulateEscKeyPress}
                    >
                        privacy policy
                    </Link>
                    .
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
