import { useParams, useLocation } from "react-router-dom";
import { IconUser } from "@tabler/icons-react";
import { useGetSpotifyPlaylistByIdQuery } from "@/redux/api/routes/spotify";
import { useGetApplePlaylistByIdQuery } from "@/redux/api/routes/apple";
import { skipToken } from "@reduxjs/toolkit/query";
import ViewSkeleton from "@/components/skeletons/ViewSkeleton";

export default function PlaylistPage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const platform = location.pathname.includes("/spotify/")
        ? "spotify"
        : "apple";

    const spotifyResult = useGetSpotifyPlaylistByIdQuery(id ?? skipToken);
    const appleResult = useGetApplePlaylistByIdQuery(id ?? skipToken);

    const {
        data: playlist,
        isLoading,
        isError,
    } = platform === "spotify" ? spotifyResult : appleResult;

    if (isLoading) return <ViewSkeleton />;
    if (isError) return <div>Error fetching playlist</div>;

    const renderSongs = () => {
        if (playlist && playlist.songs.length > 0) {
            return (
                <div className="flex flex-col space-y-2 mt-4">
                    {playlist.songs.map((song, index) => (
                        <div
                            key={index}
                            className="flex flex-row space-x-4 items-center"
                        >
                            <img
                                src={song.imageUrl}
                                alt=""
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
        } else {
            return (
                <div className="h-[300px] flex justify-center items-center">
                    <p>It looks like this playlist is empty.</p>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <div className="space-y-1">
                <h3>{playlist?.title}</h3>
                <p>{playlist?.description}</p>
            </div>
            <div className="flex flex-row justify-between items-end">
                <div className="flex items-center space-x-10">
                    <p>
                        <i className="ri-music-2-fill"></i> {playlist?.total}
                    </p>
                </div>
                <div className="w-fit flex items-center space-x-1">
                    <IconUser size={20} />
                    <p>{playlist?.author.displayName}</p>
                </div>
            </div>
            <hr />
            {renderSongs()}
        </div>
    );
}
