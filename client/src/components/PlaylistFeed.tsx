import { useNavigate } from "react-router-dom";
import Preview from "./Preview";

export default function PlaylistFeed({
    playlists,
    emptyMessage,
}: {
    playlists: Playlist[];
    emptyMessage: string;
}) {
    const navigate = useNavigate();
    console.log(playlists);
    const renderFeed = () => {
        if (Object.keys(playlists).length === 0) {
            return (
                <div className="h-[300px] flex justify-center items-center">
                    <p>{emptyMessage}</p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col space-y-6">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="flex flex-row items-center w-full space-x-4"
                        >
                            <div className="w-[55%]">
                                <Preview
                                    source={playlist}
                                    path={`/top/${playlist.origin}/${playlist.id}`}
                                />
                            </div>

                            <div
                                id="keep-380"
                                className="flex flex-col w-[380px] flex-shrink-0 self-start mt-2 space-y-1"
                            >
                                <button
                                    className="w-fit"
                                    onClick={() =>
                                        navigate(
                                            `/top/${playlist.origin}/${playlist.id}`
                                        )
                                    }
                                >
                                    <p className="text-ellipsis	whitespace-nowrap overflow-hidden text-xl font-bold">
                                        {playlist.title}
                                    </p>
                                </button>
                                <div className="flex flex-row space-x-8 text-silver">
                                    <p>{playlist.author.displayName}</p>
                                    <p>{playlist.total} songs</p>
                                </div>
                                <p className="text-ellipsis	whitespace-nowrap overflow-hidden text-silver">
                                    {playlist.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };
    return <>{renderFeed()}</>;
}
