import { useEffect, useState } from "react";
import Modal from "./Modal";
import { customSelectStyles } from "~/styles/customStyles";
import { useForm } from "react-hook-form";
import { createPost } from "~/api/routes/post";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Select from "react-select";
import {
    fetchAllSpotifyPlaylistsByUserId,
    fetchIsrcsByPlaylistId,
} from "~/api/routes/spotify";
import { isSpotifyTokenExpired } from "~/redux/features/spotify/spotifySlice";
import { isAppleTokenExpired } from "~/redux/features/apple/appleSlice";

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

    useEffect(() => {
        !isSpotifyTokenExpired(spotifyToken) && handleSpotifySelect();
    }, [spotifyToken]);

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
            setPlaylistOptions(formattedPlaylists);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setValue("title", "");
        setValue("description", "");
        setSelectedOption(null);
    };

    const handleSelectOption = (val: any) => {
        console.log("Selected Playlist: ", val);
        setSelectedOption(val);
        setValue("title", val.value.name);
        setValue("description", val.value.description);
    };

    const handlePost = async (data: PostForm) => {
        if (
            user &&
            selectedOption &&
            spotifyToken &&
            spotifyToken.accessToken
        ) {
            const isrcs = await fetchIsrcsByPlaylistId({
                token: spotifyToken.accessToken,
                playlistId: selectedOption.value.id,
            });

            console.log("isrcs: ", isrcs);

            await createPost({
                title: data.title,
                description: data.description,
                origin: "spotify",
                isrcs: isrcs,
                authorId: user.id,
            });
        }
        handleClose();
    };

    const handleAppleSelect = async () => {
        if (selectedRadio != "appleMusic") {
            setSelectedRadio("appleMusic");
            //handle populating apple music playlists here
            setPlaylistOptions([]);
        }
    };

    const handleSpotifySelect = async () => {
        if (selectedRadio != "spotify") {
            setSelectedRadio("spotify");
            await populateSpotifyPlaylists();
        }
    };

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
                                    checked={selectedRadio === "appleMusic"}
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
                                {isAppleTokenExpired(appleToken) ? (
                                    <button
                                        type="button"
                                        className="text-xs underline"
                                        onClick={() => {
                                            console.log(
                                                "handle connect to apple music here"
                                            );
                                        }}
                                    >
                                        Connect to Apple Music
                                    </button>
                                ) : null}
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
