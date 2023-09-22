import NavbarLink from "./NavbarLink";
import { useUser, SignOutButton } from "@clerk/clerk-react";

export default function Navbar() {
    const { isSignedIn } = useUser();

    return (
        <div className="flex justify-between items-center text-black dark:text-white">
            <NavbarLink to="/" label="curate" />
            <div className="space-x-8">
                <NavbarLink to="/feed" label="feed" />
                <NavbarLink to="/search" label="search" />
                <NavbarLink to="/profile" label="profile" />
                {isSignedIn ? (
                    <SignOutButton>logout</SignOutButton>
                ) : (
                    <NavbarLink to="/signin" label="login" />
                )}
            </div>
        </div>
    );
}
