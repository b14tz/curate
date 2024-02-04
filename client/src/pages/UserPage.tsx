import Feed from "../components/PostFeed";
import Header from "@/components/user/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteUser, getUser, updateUser } from "@/api/routes/user";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { clearUser, setUser } from "@/redux/features/user/userSlice";
import {
    clearSpotify,
    isSpotifyTokenExpired,
    updateAccessToken,
} from "@/redux/features/spotify/spotifySlice";
import AppleAuthToggle from "@/components/apple/AppleAuthToggle";
import { getExpirationTime } from "@/utils/time";
import { refreshAccessToken } from "@/api/routes/spotify";
import { useGetUserPostsQuery } from "@/redux/api/routes/post";
import { skipToken } from "@reduxjs/toolkit/query";

export default function UserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [changeUsernameOpen, setChangeUsernameOpen] = useState(false);
    const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
    const [userData, setUserData] = useState<User>({
        id: "",
        token: "",
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        bio: "",
        connectedToSpotify: false,
        connectedToApple: false,
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<{ displayName: string }>();

    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );
    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );
    const isCurrentUser = id === currentUser?.id;

    const {
        data: posts,
        isLoading,
        error,
    } = useGetUserPostsQuery(id ?? skipToken);

    const handleChangeUsername = async (data: { displayName: string }) => {
        try {
            await updateUser(userData.id, data);
            dispatch(
                setUser({ ...currentUser, displayName: data.displayName })
            );
        } catch (error) {
            console.error(error);
        }
        setChangeUsernameOpen(false);
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser(userData.id);
            dispatch(clearUser());
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const ensureValidSpotifyToken = async () => {
        if (isSpotifyTokenExpired(spotifyToken) && spotifyToken.refreshToken) {
            const data = await refreshAccessToken(spotifyToken.refreshToken);
            const expirationTime = getExpirationTime(data.expires_in);
            await dispatch(
                updateAccessToken({
                    accessToken: data.access_token,
                    expirationTime: expirationTime,
                })
            );
        }
    };

    useEffect(() => {
        async function populateUser() {
            ensureValidSpotifyToken();
            if (id && currentUser) {
                const fetchedUser = await getUser(id);
                setUserData(fetchedUser);
                setValue("displayName", fetchedUser.displayName);
            }
        }
        populateUser();
    }, [id, currentUser]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching posts</div>;

    return (
        <>
            <div className="space-y-8">
                <Header
                    user={userData}
                    setUser={setUserData}
                    isCurrentUser={isCurrentUser}
                    setSettingsOpen={setSettingsOpen}
                />
                <Feed
                    posts={posts ?? []}
                    emptyMessage={
                        isCurrentUser
                            ? "You haven't posted yet. What are you waiting for?"
                            : "This user hasn't posted yet."
                    }
                />
            </div>

            <Modal
                open={settingsOpen}
                handleClose={() => setSettingsOpen(false)}
                title="Settings"
            >
                <div className="flex flex-col space-y-2">
                    <p>Email: {userData.email}</p>
                    <p>
                        Full Name: {userData.firstName} {userData.lastName}
                    </p>
                    <div className="flex flex-row space-x-4">
                        <p>Username: {userData.displayName}</p>
                        <button
                            className="underline"
                            onClick={() => {
                                setSettingsOpen(false);
                                setChangeUsernameOpen(true);
                            }}
                        >
                            Change
                        </button>
                    </div>
                    {spotifyToken.refreshToken ? (
                        <button
                            className="w-fit underline"
                            onClick={() => {
                                dispatch(clearSpotify());
                            }}
                        >
                            Disconnect Spotify Account
                        </button>
                    ) : (
                        <button
                            className="w-fit underline"
                            onClick={() => {
                                window.location.href = `${
                                    import.meta.env.VITE_SERVER_URL
                                }/spotify/auth`;
                            }}
                        >
                            Connect Spotify Account
                        </button>
                    )}
                    <AppleAuthToggle />
                    <button
                        className="underline w-fit text-error"
                        onClick={() => {
                            setSettingsOpen(false);
                            setDeleteAccountOpen(true);
                        }}
                    >
                        Delete Account
                    </button>
                </div>
            </Modal>

            <Modal
                open={changeUsernameOpen}
                handleClose={() => setChangeUsernameOpen(false)}
                title="Change Username"
            >
                <form
                    onSubmit={handleSubmit(handleChangeUsername)}
                    className="flex flex-row space-x-4"
                >
                    <div className="space-y-1">
                        <div className="flex flex-row space-x-4">
                            <input
                                type="text"
                                placeholder="Username"
                                {...register("displayName", {
                                    required: "Username is required",
                                    minLength: 2,
                                })}
                                className="p-2 rounded-md shadow-inner bg-b-tertiary dark:bg-db-tertiary w-full"
                            />
                            <button className="ml-4 bg-salmon text-white drop-shadow-md py-2 px-4 rounded-md">
                                <p>Change</p>
                            </button>
                        </div>
                        {errors.displayName && (
                            <p className="text-red-1 text-xs">
                                {errors.displayName.message as string}
                            </p>
                        )}
                    </div>
                </form>
            </Modal>
            <Modal
                open={deleteAccountOpen}
                handleClose={() => setDeleteAccountOpen(false)}
                title="Delete Account"
            >
                <div className="max-w-[400px]">
                    <p className="mb-4">
                        Are you sure you want to delete your account? All data
                        will be gone for good.
                    </p>

                    <div className="flex flex-row justify-end">
                        <button
                            onClick={() => setDeleteAccountOpen(false)}
                            type="button"
                        >
                            <p>Cancel</p>
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="ml-4 bg-error text-white drop-shadow-md py-2 px-4 rounded-md"
                        >
                            <p>Delete</p>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
