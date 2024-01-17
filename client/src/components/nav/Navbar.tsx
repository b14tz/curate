// client/src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IconPlus, IconUser } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector hook
import Select from "react-select";

import NavbarLink from "./NavbarLink";
import Modal from "../Modal";
import googleLogo from "~/assets/google.png";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import logo from "~/assets/panda.png";
import { createPost } from "~/api/routes/post";
import { RootState } from "~/redux/store";
import { clearUser } from "~/redux/features/user/userSlice";
import { fetchAllSpotifyPlaylists } from "~/api/routes/spotify";
import { customSelectStyles } from "~/styles/customStyles";

export default function Navbar() {
    const [postOpen, setPostOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);

    const [playlistOptions, setPlaylistOptions] = useState([]);

    const [selectedRadio, setSelectedRadio] = useState("spotify");

    const handleRadioSelect = (value: string) => {
        setSelectedRadio(value);
    };

    const user = useSelector((state: RootState) => state.userReducer.user);
    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profileRoute = `/user/${user?.id}`;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostForm>();

    const logoutWithRedirect = async () => {
        await dispatch(clearUser());
        navigate("/");
    };

    useEffect(() => {
        async function populateSpotifyPlaylists() {
            if (spotifyToken.accessToken && spotifyToken.spotifyId) {
                const playlists = await fetchAllSpotifyPlaylists({
                    token: spotifyToken.accessToken,
                    spotifyId: spotifyToken.spotifyId,
                });
                console.log("playlists: ", playlists);
                const formattedPlaylists = playlists.map((playlist: any) => ({
                    label: playlist.name,
                    value: playlist,
                }));
                console.log(formattedPlaylists);
                setPlaylistOptions(formattedPlaylists);
            }
        }
        populateSpotifyPlaylists();
    }, [spotifyToken]);

    const handlePost = async (data: PostForm) => {
        if (user) {
            await createPost({
                title: data.title,
                description: "description",
                origin: "spotify",
                isrcs: "",
                authorId: user.id,
            });
        }
        setPostOpen(false);
    };

    return (
        <div className="flex justify-between items-center text-black dark:text-white">
            <NavLink to="/" className="flex items-center space-x-2">
                <img className="w-7 h-7 mt-1" src={logo} />
                <h3 className="font-bold">Curate</h3>
            </NavLink>
            <div className="space-x-8 flex flex-row items-center">
                <NavbarLink to="/" label="Home" />
                <NavbarLink to="/discover" label="Discover" />
                <NavbarLink to="/search" label="Search" />
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
            <Modal open={authOpen} setOpen={setAuthOpen} title="Login">
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

            <Modal open={postOpen} setOpen={setPostOpen} title="Post">
                <form
                    onSubmit={handleSubmit(handlePost)}
                    className="space-y-4 min-w-[500px]"
                >
                    <div className="space-y-2">
                        <p className="text-lg font-medium">Origin</p>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={() => handleRadioSelect("spotify")}
                                className="flex p-3 block w-full bg-b-secondary hover:bg-snow border-2 border-b-primary rounded-lg text-sm focus:ring-1 focus:border-salmon focus:ring-salmon"
                            >
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Spotify
                                </span>
                                <input
                                    type="radio"
                                    name="radio-post-origin"
                                    className="accent-salmon shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-salmon disabled:opacity-50 disabled:pointer-events-none"
                                    checked={selectedRadio === "spotify"}
                                    readOnly
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() => handleRadioSelect("appleMusic")}
                                className="flex p-3 block w-full bg-b-secondary hover:bg-snow border-2 border-b-primary rounded-lg text-sm focus:ring-1 focus:border-salmon focus:ring-salmon"
                            >
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Apple Music
                                </span>
                                <input
                                    type="radio"
                                    name="radio-post-origin"
                                    className="accent-salmon shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-salmon disabled:opacity-50 disabled:pointer-events-none"
                                    checked={selectedRadio === "appleMusic"}
                                    readOnly
                                    disabled
                                />
                            </button>
                        </div>

                        <Select
                            options={playlistOptions}
                            styles={customSelectStyles}
                            placeholder="Playlist"
                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-lg font-medium">Details</p>
                        <div className="space-y-1">
                            <input
                                type="text"
                                placeholder="Title"
                                {...register("title", {
                                    required: "Content is required",
                                    minLength: 2,
                                })}
                                className="p-2 rounded-md shadow-inner bg-b-tertiary dark:bg-db-tertiary w-full"
                            />
                            {errors.title && (
                                <p className="text-red-1 text-xs">
                                    {errors.title.message as string}
                                </p>
                            )}
                        </div>

                        <textarea
                            rows={5}
                            placeholder="Description"
                            {...register("description", {})}
                            className="p-2 rounded-md shadow-inner bg-b-tertiary dark:bg-db-tertiary w-full"
                        />
                    </div>

                    <div className="flex flex-row justify-end pt-4">
                        <button
                            onClick={() => setPostOpen(false)}
                            type="button"
                        >
                            <p>Cancel</p>
                        </button>
                        <button className="ml-4 bg-salmon text-white drop-shadow-md py-2 px-4 rounded-md">
                            <p>Post</p>
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
