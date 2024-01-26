import { IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApplePlaylistById } from "~/api/routes/apple";
import { fetchSpotifyPlaylistById } from "~/api/routes/spotify";

export default function PlaylistPage() {
    const { id } = useParams();

    const [playlist, setPlaylist] = useState<Playlist>({
        id: "",
        title: "",
        description: "",
        songs: [],
        origin: "",
        total: 0,
        next: "",
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

    async function handleSpotifyPost(playlistId: string) {
        if (id) {
            const data = await fetchSpotifyPlaylistById(playlistId);
            setPlaylist(data);
        }
    }

    async function handleApplePost(playlistId: string) {
        const data = await fetchApplePlaylistById(playlistId);
        setPlaylist(data);
    }

    useEffect(() => {
        const path = window.location.pathname;
        const pathParts = path.split("/");
        const platform = pathParts[2];

        if (platform === "apple") {
            id && handleApplePost(id);
        } else if (platform === "spotify") {
            id && handleSpotifyPost(id);
        } else {
            console.log("Platform not recognized");
        }
    }, [id]);

    const renderSongs = () => {
        if (playlist) {
            if (Object.keys(playlist.songs).length === 0) {
                return (
                    <div className="h-[300px] flex justify-center items-center">
                        <p>It looks like this playlist is empty.</p>
                    </div>
                );
            } else {
                return (
                    <div className="flex flex-col space-y-2 mt-4">
                        {playlist.songs.map((song) => (
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
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
            </div>
            <div className="flex flex-row justify-between items-end">
                <div className="flex flex-row items-center space-x-10">
                    <p>
                        <i className="ri-music-2-fill"></i>
                        {playlist.total}
                    </p>
                </div>

                <div className="w-fit flex items-center space-x-1">
                    <IconUser size={20} />
                    <p>{playlist.author.displayName}</p>
                </div>
            </div>
            <hr />
            <div className="flex flex-col space-y-2">
                <>{renderSongs()}</>
            </div>
        </div>
    );
}
