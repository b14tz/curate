import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/clerk-react";
import { CircularProgress } from "@mui/material";

export default function SignUpPage() {
    return (
        <div className="flex w-full justify-center">
            <ClerkLoaded>
                <SignUp path="/signup" signInUrl="/signin" redirectUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
                <div className="flex w-full min-h-[400px] items-center justify-center">
                    <CircularProgress sx={{ color: "#FE346E" }} />
                </div>
            </ClerkLoading>
        </div>
    );
}
