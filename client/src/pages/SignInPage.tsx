import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/clerk-react";
import { CircularProgress } from "@mui/material";

export default function LoginPage() {
    return (
        <div className="flex w-full justify-center">
            <ClerkLoaded>
                <SignIn path="/signin" signUpUrl="/signup" redirectUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
                <div className="flex w-full min-h-[400px] items-center justify-center">
                    <CircularProgress sx={{ color: "#FE346E" }} />
                </div>
            </ClerkLoading>
        </div>
    );
}
