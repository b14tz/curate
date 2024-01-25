import { useNavigate } from "react-router-dom";

export default function TopPlaylistFeed({
    playlists,
    emptyMessage,
}: {
    playlists: TopPlaylist[];
    emptyMessage: string;
}) {
    const navigate = useNavigate();

    const renderFeed = () => {
        if (Object.keys(playlists).length === 0) {
            return (
                <div className="h-[300px] flex justify-center items-center">
                    <p>{emptyMessage}</p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col space-y-8">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="flex flex-row space-x-4 items-center"
                        >
                            <button
                                className="flex flex-row drop-shadow-xl"
                                onClick={() =>
                                    navigate(
                                        `/top/${playlist.origin}/${playlist.id}`
                                    )
                                }
                            >
                                {Array.from({ length: 8 }).map((_, index) => {
                                    const song = playlist.songs[index];
                                    const zIndex = 1000 - index;
                                    const isOverlappingImage = index > 0;

                                    if (song) {
                                        // Render song image
                                        return (
                                            <img
                                                key={index}
                                                src={song.imageUrl}
                                                className={`w-28 h-28 drop-shadow ${
                                                    isOverlappingImage
                                                        ? "ml-[-50px]"
                                                        : ""
                                                }`}
                                                style={{ zIndex }}
                                            />
                                        );
                                    } else {
                                        // Render placeholder if song is not available
                                        return (
                                            <div
                                                key={index}
                                                className={`w-28 h-28 border border-snow bg-white shadow-inner drop-shadow ${
                                                    isOverlappingImage
                                                        ? "ml-[-50px]"
                                                        : ""
                                                }`}
                                                style={{ zIndex }}
                                            ></div>
                                        );
                                    }
                                })}
                            </button>

                            <div className="flex flex-col max-w-[380px]">
                                <button
                                    className="w-fit"
                                    onClick={() =>
                                        navigate(
                                            `/top/${playlist.origin}/${playlist.id}`
                                        )
                                    }
                                >
                                    <p className="underline">
                                        {playlist.title}
                                    </p>
                                </button>
                                <div className="flex flex-row space-x-10">
                                    <p>{playlist.author.displayName}</p>
                                    <p>
                                        <i className="ri-music-2-fill"></i>
                                        {playlist.songs.length}
                                    </p>
                                </div>
                                <p className="text-ellipsis	whitespace-nowrap overflow-hidden">
                                    {playlist.description}
                                </p>
                                <p>-</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };
    return <>{renderFeed()}</>;
}
