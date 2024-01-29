import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import { customSelectStyles } from "~/styles/customStyles";
import { useForm } from "react-hook-form";
import { createPost } from "~/api/routes/post";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Select from "react-select";
import {
    fetchAllSpotifyPlaylistsByUserId,
    refreshAccessToken,
} from "~/api/routes/spotify";
import {
    isSpotifyTokenExpired,
    updateAccessToken,
} from "~/redux/features/spotify/spotifySlice";
import { isAppleTokenExpired } from "~/redux/features/apple/appleSlice";
import AppleAuthButton from "./apple/AppleAuthButton";
import { fetchAllPlaylistsByMusicUserToken } from "~/api/routes/apple";
import { getExpirationTime } from "~/utils/time";

export default function PostModal({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (val: boolean) => void;
}) {
    const [playlistOptions, setPlaylistOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [selectedRadio, setSelectedRadio] = useState("");

    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.userReducer.user);
    const appleToken = useSelector((state: RootState) => state.appleReducer);
    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<PostForm>();

    const handleClose = () => {
        setOpen(false);
        setValue("title", "");
        setValue("description", "");
        setSelectedOption(null);
    };

    const handleSelectOption = (val: any) => {
        setSelectedOption(val);
        setValue("title", val.value.name);
        setValue("description", val.value.description);
    };

    const handleClearOption = () => {
        setSelectedOption(null);
        setValue("title", "");
        setValue("description", "");
    };

    const handlePost = async (data: PostForm) => {
        if (user && selectedOption) {
            await createPost({
                title: data.title,
                description: data.description,
                origin: selectedRadio,
                originId: selectedOption.value.id,
                authorId: user.id,
            });
        }
        handleClose();
        location.reload();
    };

    async function populateApplePlaylists() {
        if (appleToken.musicUserToken) {
            const playlists = await fetchAllPlaylistsByMusicUserToken(
                appleToken.musicUserToken
            );
            const formattedPlaylists = playlists.map((playlist: any) => ({
                label: playlist.name,
                value: playlist,
            }));
            handleClearOption();
            setPlaylistOptions(formattedPlaylists);
        }
    }

    async function populateSpotifyPlaylists() {
        if (spotifyToken.accessToken && spotifyToken.spotifyId) {
            const playlists = await fetchAllSpotifyPlaylistsByUserId({
                token: spotifyToken.accessToken,
                spotifyId: spotifyToken.spotifyId,
            });
            const formattedPlaylists = playlists.map((playlist: any) => ({
                label: playlist.name,
                value: playlist,
            }));
            handleClearOption();
            setPlaylistOptions(formattedPlaylists);
        }
    }

    const handleAppleSelect = async () => {
        if (selectedRadio != "apple") {
            setSelectedRadio("apple");
            await populateApplePlaylists();
        }
    };

    const handleSpotifySelect = async () => {
        if (selectedRadio != "spotify") {
            setSelectedRadio("spotify");
            await populateSpotifyPlaylists();
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
        ensureValidSpotifyToken();
        !isSpotifyTokenExpired(spotifyToken) && handleSpotifySelect();
    }, [spotifyToken, appleToken]);

    return (
        <Modal open={open} handleClose={handleClose} title="Post">
            <form
                onSubmit={handleSubmit(handlePost)}
                className="space-y-4 min-w-[500px]"
            >
                <div className="space-y-2">
                    <p className="text-lg font-medium">Origin</p>
                    <div>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={() => handleSpotifySelect()}
                                className="flex p-3 block w-full bg-b-secondary hover:bg-snow border-2 border-b-primary rounded-lg text-sm focus:ring-1 focus:border-salmon focus:ring-salmon"
                                disabled={isSpotifyTokenExpired(spotifyToken)}
                            >
                                <div className="flex flex-col items-start">
                                    <p className="text-sm text-gray-500">
                                        Spotify
                                    </p>
                                </div>
                                <input
                                    type="radio"
                                    name="radio-post-origin"
                                    className="accent-salmon shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-salmon disabled:opacity-50 disabled:pointer-events-none"
                                    checked={selectedRadio === "spotify"}
                                    readOnly
                                    disabled={isSpotifyTokenExpired(
                                        spotifyToken
                                    )}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() => handleAppleSelect()}
                                className="flex p-3 block w-full bg-b-secondary hover:bg-snow border-2 border-b-primary rounded-lg text-sm focus:ring-1 focus:border-salmon focus:ring-salmon"
                                disabled={isAppleTokenExpired(appleToken)}
                            >
                                <p className="text-sm text-gray-500">
                                    Apple Music
                                </p>

                                <input
                                    type="radio"
                                    name="radio-post-origin"
                                    className="accent-salmon shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-salmon disabled:opacity-50 disabled:pointer-events-none"
                                    checked={selectedRadio === "apple"}
                                    readOnly
                                    disabled={isAppleTokenExpired(appleToken)}
                                />
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2 pl-3">
                                {isSpotifyTokenExpired(spotifyToken) ? (
                                    <button
                                        type="button"
                                        className="text-xs underline"
                                        onClick={() => {
                                            window.location.href = `${
                                                import.meta.env.VITE_SERVER_URL
                                            }/spotify/auth`;
                                        }}
                                    >
                                        Connect to Spotify
                                    </button>
                                ) : null}
                            </div>
                            <div className="w-1/2 pl-3">
                                <AppleAuthButton />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-lg font-medium">Details</p>
                    <Select
                        options={playlistOptions}
                        styles={customSelectStyles}
                        value={selectedOption}
                        onChange={handleSelectOption}
                        placeholder="Playlist"
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary: "#FE346E",
                                primary50: "#FFC3D4",
                                primary25: "#FDE8EE",
                            },
                        })}
                    />
                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder="Title"
                            {...register("title", {
                                required: "Title is required",
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
                    <button onClick={() => handleClose()} type="button">
                        <p>Cancel</p>
                    </button>
                    <button className="ml-4 bg-salmon text-white drop-shadow-md py-2 px-4 rounded-md">
                        <p>Post</p>
                    </button>
                </div>
            </form>
        </Modal>
    );
}
