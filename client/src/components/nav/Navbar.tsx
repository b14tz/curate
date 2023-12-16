import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import NavbarLink from "./NavbarLink";
import Modal from "../Modal";
import googleLogo from "~/assets/google.png";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const logoutWithRedirect = () =>
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });

    return (
        <div className="flex justify-between items-center text-black dark:text-white">
            <NavLink to="/">Curate</NavLink>
            <div className="space-x-8">
                <NavbarLink to="/" label="Home" />
                <NavbarLink to="/discover" label="Discover" />
                <NavbarLink to="/search" label="Search" />
                {isAuthenticated ? (
                    <>
                        <Popover placement="bottom-end">
                            <PopoverTrigger>{user?.name}</PopoverTrigger>
                            <PopoverContent>
                                <div className="flex flex-col items-start p-2 bg-b-secondary drop-shadow dark:bg-db-secondary rounded-md space-y-1">
                                    <NavbarLink to="/profile" label="Profile" />
                                    <button
                                        onClick={() => {
                                            logoutWithRedirect();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </>
                ) : (
                    <button onClick={() => setOpen(true)}>Login</button>
                )}
            </div>
            <Modal open={open} setOpen={setOpen} title="Login">
                <button
                    className="bg-b-tertiary text-black drop-shadow-md py-2 pl-3 pr-5 rounded-md flex flex-row justify-center items-center"
                    onClick={() => loginWithRedirect()}
                >
                    <img src={googleLogo} className="w-7 mr-2" />
                    <p>Authorize with Google</p>
                </button>
            </Modal>
        </div>
    );
}
