import { NavLink } from "react-router-dom";
import NavbarLink from "./NavbarLink";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useState } from "react";
import Modal from "../Modal";
import googleLogo from "~/assets/google.png";

export default function Navbar() {
    const { isSignedIn } = useUser();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-between items-center text-black dark:text-white">
            <NavLink to="/">Curate</NavLink>
            <div className="space-x-8">
                <NavbarLink to="/" label="Home" />
                <NavbarLink to="/discover" label="Discover" />
                <NavbarLink to="/search" label="Search" />
                {isSignedIn ? (
                    <>
                        <NavbarLink to="/profile" label="Profile" />
                        <SignOutButton>Logout</SignOutButton>
                    </>
                ) : (
                    <button onClick={() => setOpen(true)}>Login</button>
                )}
            </div>
            <Modal open={open} setOpen={setOpen} title="Login">
                <button
                    className="bg-b-tertiary text-black drop-shadow-md py-2 pl-3 pr-5 rounded-md flex flex-row justify-center items-center"
                    onClick={() => console.log("hi")}
                >
                    <img src={googleLogo} className="w-7 mr-2" />
                    <p>Authorize with Google</p>
                </button>
            </Modal>
        </div>
    );
}
