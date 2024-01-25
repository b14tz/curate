// client/src/components/Navbar.tsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IconPlus, IconUser } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector hook

import NavbarLink from "./NavbarLink";
import Modal from "../Modal";
import googleLogo from "~/assets/google.png";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import logo from "~/assets/panda.png";
import { RootState } from "~/redux/store";
import { clearUser } from "~/redux/features/user/userSlice";
import PostModal from "../PostModal";

export default function Navbar() {
    const [postOpen, setPostOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);

    const user = useSelector((state: RootState) => state.userReducer.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profileRoute = `/user/${user?.id}`;

    const logoutWithRedirect = async () => {
        await dispatch(clearUser());
        navigate("/");
    };

    const handleAuthClose = () => {
        setAuthOpen(false);
    };

    return (
        <div className="flex justify-between items-center text-black dark:text-white">
            <NavLink to="/" className="flex items-center space-x-2">
                <img className="w-7 h-7 mt-1" src={logo} />
                <h3 className="font-bold">Curate</h3>
            </NavLink>
            <div className="space-x-8 flex flex-row items-center">
                <NavbarLink to="/" label="Home" />
                <NavbarLink to="/discover/spotify" label="Discover" />
                <NavbarLink to="/search/users" label="Search" />
                {user ? (
                    <>
                        <Popover placement="bottom-start">
                            <PopoverTrigger>
                                <div className="pl-3 pr-4 py-2 rounded-lg border flex space-x-2 items-center">
                                    <IconUser size={20} />
                                    <p>{user.displayName}</p>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex flex-col items-start px-4 py-2 bg-b-secondary drop-shadow dark:bg-db-secondary rounded-md space-y-1">
                                    <NavbarLink
                                        to={profileRoute}
                                        label="Profile"
                                    />
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
                        <button
                            onClick={() => setPostOpen(true)}
                            className="bg-salmon text-white rounded-lg py-2 pl-3 pr-4 flex items-center space-x-2"
                        >
                            <IconPlus size={20} />
                            <p>Post</p>
                        </button>
                    </>
                ) : (
                    <button
                        className="px-4 py-2 rounded-lg border"
                        onClick={() => setAuthOpen(true)}
                    >
                        Login
                    </button>
                )}
            </div>

            <Modal open={authOpen} handleClose={handleAuthClose} title="Login">
                <button
                    className="bg-b-tertiary text-black drop-shadow-md py-2 pl-3 pr-5 rounded-md flex flex-row justify-center items-center"
                    onClick={() => {
                        window.location.href = `${
                            import.meta.env.VITE_SERVER_URL
                        }/auth/google`;
                    }}
                >
                    <img src={googleLogo} className="w-7 mr-2" />
                    <p>Authorize with Google</p>
                </button>
            </Modal>

            <PostModal open={postOpen} setOpen={setPostOpen} />
        </div>
    );
}
