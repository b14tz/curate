import { useEffect, useState } from "react";
import Modal from "./Modal";
import { customSelectStyles } from "~/styles/customStyles";
import { useForm } from "react-hook-form";
import { createPost } from "~/api/routes/post";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Select from "react-select";
import { fetchAllSpotifyPlaylists } from "~/api/routes/spotify";

export default function PostModal({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (val: boolean) => void;
}) {
    const [playlistOptions, setPlaylistOptions] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState("spotify");

    const user = useSelector((state: RootState) => state.userReducer.user);
    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostForm>();

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
        setOpen(false);
    };

    const handleRadioSelect = (value: string) => {
        setSelectedRadio(value);
    };

    return (
        <Modal open={open} setOpen={setOpen} title="Post">
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
                            disabled={false}
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
                                disabled={false}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRadioSelect("appleMusic")}
                            className="flex p-3 block w-full bg-b-secondary hover:bg-snow border-2 border-b-primary rounded-lg text-sm focus:ring-1 focus:border-salmon focus:ring-salmon"
                            disabled={true}
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
                                disabled={true}
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
                    <button onClick={() => setOpen(false)} type="button">
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
