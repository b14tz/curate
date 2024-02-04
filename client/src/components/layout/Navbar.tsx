import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus, IconUser } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector hook

import StyledNavLink from "../StyledNavLink";
import Modal from "../ui/Modal";
import googleLogo from "~/assets/google.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
//import logo from "~/assets/panda.png";
import { RootState } from "~/redux/store";
import { clearUser } from "~/redux/features/user/userSlice";
import PostModal from "../PostModal";

export default function Navbar() {
    const [postOpen, setPostOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);

    const user = useSelector((state: RootState) => state.userReducer.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutWithRedirect = async () => {
        await dispatch(clearUser());
        navigate("/");
    };

    const handleAuthClose = () => {
        setAuthOpen(false);
    };

    return (
        <div className="flex justify-center text-black">
            <div className="space-x-8 flex flex-row items-center rounded-full border py-1.5 pl-3 pr-1.5">
                <StyledNavLink
                    to="/feed"
                    label="Home"
                    pendingClasses="text-black"
                    activeClasses="text-salmon"
                />
                <StyledNavLink
                    to="/discover"
                    label="Discover"
                    pendingClasses="text-black"
                    activeClasses="text-salmon"
                />
                <StyledNavLink
                    to="/search"
                    label="Search"
                    pendingClasses="text-black"
                    activeClasses="text-salmon"
                />
                {user ? (
                    <>
                        <Popover placement="bottom-start">
                            <PopoverTrigger>
                                <div className="flex space-x-2 items-center border-b-2">
                                    <IconUser size={20} />
                                    <p>{user.displayName}</p>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex flex-col items-start bg-b-secondary drop-shadow dark:bg-db-secondary rounded-md space-y-1 p-2">
                                    <StyledNavLink
                                        to={`/user/${user?.id}`}
                                        label="Profile"
                                        pendingClasses="text-black"
                                        activeClasses="text-salmon"
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
                            className="bg-salmon text-white rounded-full flex items-center space-x-2 pl-2 pr-4 py-1"
                        >
                            <IconPlus size={20} />
                            <p>Post</p>
                        </button>
                    </>
                ) : (
                    <button
                        className="rounded-full border px-2 py-1"
                        onClick={() => setAuthOpen(true)}
                    >
                        Login
                    </button>
                )}
            </div>

            <Modal open={authOpen} handleClose={handleAuthClose} title="Login">
                <button
                    className="bg-b-tertiary text-black drop-shadow-md rounded-md flex flex-row justify-center items-center p-2"
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
