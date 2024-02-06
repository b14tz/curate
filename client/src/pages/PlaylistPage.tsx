import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useGetSpotifyPlaylistByIdQuery } from "@/redux/api/routes/spotify";
import { useGetApplePlaylistByIdQuery } from "@/redux/api/routes/apple";
import { skipToken } from "@reduxjs/toolkit/query";
import ViewSkeleton from "@/components/skeletons/ViewSkeleton";
import { Button } from "@/components/ui/button";
import { CircleUserRound, RefreshCcwDot } from "lucide-react";
import SavePlaylistModal from "@/components/SavePlaylistModal";

export default function PlaylistPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const platform = location.pathname.includes("/spotify/")
        ? "spotify"
        : "apple";

    const spotifyResult = useGetSpotifyPlaylistByIdQuery(
        platform === "spotify" && id ? id : skipToken
    );
    const appleResult = useGetApplePlaylistByIdQuery(
        platform === "apple" && id ? id : skipToken
    );

    const {
        data: playlist,
        isLoading,
        isError,
    } = platform === "spotify" ? spotifyResult : appleResult;

    if (isLoading || !playlist) return <ViewSkeleton />;
    if (isError) return <div>Error fetching playlist</div>;

    const renderSongs = () => {
        if (playlist.songs.length > 0) {
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
                                <p className="text-silver">{song.artist}</p>
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
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
            </div>
            <div className="flex flex-row justify-between items-end">
                <div className="flex items-center space-x-4">
                    <SavePlaylistModal playlist={playlist}>
                        <Button
                            variant="outline"
                            className="flex space-x-2 items-center"
                        >
                            <div className="flex items-center space-x-1">
                                <RefreshCcwDot size={18} />
                                <p>Save</p>
                            </div>
                        </Button>
                    </SavePlaylistModal>
                    <p>{playlist.total} songs</p>
                </div>
                <Button
                    variant="outline"
                    className="flex items-center space-x-1"
                    onClick={() =>
                        navigate(
                            `/discover/${playlist.author.displayName.toLowerCase()}`
                        )
                    }
                >
                    <CircleUserRound size={18} />
                    <p>{playlist.author.displayName}</p>
                </Button>
            </div>
            <hr />
            {renderSongs()}
        </div>
    );
}
