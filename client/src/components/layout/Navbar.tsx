import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../ui/Modal";
import googleLogo from "@/assets/google.png";
import { RootState } from "@/redux/store";
import { clearUser } from "@/redux/features/user/userSlice";
import PostModal from "../PostModal";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";

export default function Navbar() {
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
        <div className="flex justify-center">
            <div className="space-x-1 flex flex-row items-center rounded-lg border py-1.5 px-1.5">
                {/* <StyledNavLink
                    to="/feed"
                    label="Home"
                    pendingClasses=""
                    activeClasses="text-primary"
                />
                <StyledNavLink
                    to="/discover"
                    label="Discover"
                    pendingClasses=""
                    activeClasses="text-primary"
                />
                <StyledNavLink
                    to="/search"
                    label="Search"
                    pendingClasses=""
                    activeClasses="text-primary"
                /> */}
                <Button onClick={() => navigate("/")} variant="ghost">
                    Home
                </Button>
                <Button onClick={() => navigate("/discover")} variant="ghost">
                    Discover
                </Button>
                <Button onClick={() => navigate("/search")} variant="ghost">
                    Search
                </Button>
                {user ? (
                    <>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        {user.displayName}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="flex flex-col items-start bg-b-secondary drop-shadow dark:bg-db-secondary rounded-md space-y-1 p-2 min-w-[90px]">
                                            <Button
                                                onClick={() =>
                                                    navigate(
                                                        `/user/${user?.id}`
                                                    )
                                                }
                                                variant={"ghost"}
                                            >
                                                Profile
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    logoutWithRedirect();
                                                }}
                                                variant={"ghost"}
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <PostModal>
                            <Button>
                                <IconPlus className="ml-[-4px] mr-2 h-4 w-4" />{" "}
                                Post
                            </Button>
                        </PostModal>
                    </>
                ) : (
                    <Button onClick={() => setAuthOpen(true)} variant={"ghost"}>
                        Login
                    </Button>
                )}
            </div>

            <Modal open={authOpen} handleClose={handleAuthClose} title="Login">
                <button
                    className="bg-b-tertiary drop-shadow-md rounded-md flex flex-row justify-center items-center p-2"
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

            {/* <PostModal open={postOpen} setOpen={setPostOpen} /> */}
        </div>
    );
}
