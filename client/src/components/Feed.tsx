import { useNavigate } from "react-router-dom";
import { formatPostTime } from "../utils/time";

export default function Feed({
    posts,
    emptyMessage,
}: {
    posts: Post[];
    emptyMessage: string;
}) {
    const navigate = useNavigate();

    const renderFeed = () => {
        if (Object.keys(posts).length === 0) {
            return (
                <div className="h-[300px] flex justify-center items-center">
                    <p>{emptyMessage}</p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col space-y-8">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-row space-x-4 items-center"
                        >
                            <div className="flex flex-row drop-shadow-xl">
                                {post.songs.map((song, index) => {
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
                                <p className="underline">{post.title}</p>
                                <div className="flex flex-row space-x-10">
                                    <button
                                        onClick={() =>
                                            navigate(`/user/${post.author.id}`)
                                        }
                                    >
                                        <p>{post.author.displayName}</p>
                                    </button>
                                    <p>
                                        <i className="ri-music-2-fill"></i>
                                        {post.songs.length}
                                    </p>
                                    <p>
                                        <i className="ri-heart-fill"></i>
                                        {post.likes.length}
                                    </p>
                                    <p>
                                        <i className="ri-chat-1-fill"></i>
                                        {post.comments.length}
                                    </p>
                                    <p>
                                        <i className="ri-download-fill"></i>
                                        {post.downloads}
                                    </p>
                                </div>
                                <p className="text-ellipsis	whitespace-nowrap overflow-hidden">
                                    {post.description}
                                </p>
                                <p>
                                    {post.createdAt
                                        ? formatPostTime(post.createdAt)
                                        : ""}
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
