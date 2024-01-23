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
                            <div className="flex flex-row drop-shadow-xl">
                                {playlist.songs.map((song, index) => {
                                    if (index === 0) {
                                        return (
                                            <img
                                                key={index}
                                                src={song.imageUrl}
                                                className="w-28 h-28"
                                            />
                                        );
                                    }
                                    if (index > 0 && index < 8) {
                                        return (
                                            <img
                                                key={index}
                                                src={song.imageUrl}
                                                className="w-28 h-28 ml-[-50px]"
                                            />
                                        );
                                    }
                                })}
                            </div>

                            <div className="flex flex-col max-w-[380px]">
                                <button
                                    className="w-fit"
                                    onClick={() =>
                                        navigate(`/top/spotify/${playlist.id}`)
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
