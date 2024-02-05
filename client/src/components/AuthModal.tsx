import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

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
                    className="flex space-x-4 w-fi"
                    onClick={() => {
                        window.location.href = `${
                            import.meta.env.VITE_SERVER_URL
                        }/auth/google`;
                    }}
                >
                    <IconBrandGoogleFilled />
                    <p>Authorize with Google</p>
                </Button>
            </DialogContent>
        </Dialog>
    );
}
