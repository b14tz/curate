import { IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSpotifyPlaylistById } from "~/api/routes/spotify";

export default function PostPage() {
    const { id } = useParams();

    const [playlist, setPost] = useState<TopPlaylist>({
        id: "",
        title: "",
        description: "",
        songs: [],
        origin: "",
        author: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            displayName: "",
            bio: "",
            connectedToSpotify: false,
            connectedToApple: false,
            token: "",
        },
    });

    useEffect(() => {
        async function populatePost() {
            if (id) {
                const data = await fetchSpotifyPlaylistById(id);
                setPost(data);
            }
        }

        populatePost();
    }, [id]);

    const renderSongs = () => {
        if (playlist) {
            if (Object.keys(playlist?.songs).length === 0) {
                return (
                    <div className="h-[300px] flex justify-center items-center">
                        <p>It looks like this playlist is empty.</p>
                    </div>
                );
            } else {
                return (
                    <div className="flex flex-col space-y-2 mt-4">
                        {playlist?.songs.map((song) => (
                            <div
                                key={song.imageUrl + song.artist + song.title}
                                className="flex flex-row space-x-4 items-center"
                            >
                                <img
                                    key={"image" + song.imageUrl}
                                    src={song.imageUrl}
                                    className="w-12 h-12"
                                />
                                <div className="flex flex-col">
                                    <p className="font-medium">{song.title}</p>
                                    <p>{song.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
                <h3>{playlist?.title}</h3>
                <p>{playlist?.description}</p>
            </div>
            <div className="flex flex-row justify-between items-end">
                <div className="flex flex-row items-center space-x-10">
                    <p>
                        <i className="ri-music-2-fill"></i>
                        {playlist?.songs.length}
                    </p>
                </div>

                <div className="w-fit flex items-center space-x-1">
                    <IconUser size={20} />
                    <p>{playlist?.author.displayName}</p>
                </div>
            </div>
            <hr />
            <div className="flex flex-col space-y-2">
                <>{renderSongs()}</>
            </div>
        </div>
    );
}
