import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/clerk-react";
import { CircularProgress } from "@mui/material";

export default function LoginPage() {
    return (
        <div className="flex w-full justify-center">
            <ClerkLoaded>
                <SignIn path="/signin" signUpUrl="/signup" />
            </ClerkLoaded>
            <ClerkLoading>
                <div className="flex w-full min-h-[400px] items-center justify-center">
                    <CircularProgress />
                </div>
            </ClerkLoading>
        </div>
    );
}
