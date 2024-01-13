import { useNavigate } from "react-router-dom";
import { formatPostTime } from "../utils/time";
import { createLike, deleteLike } from "~/api/routes/like";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

export default function Feed({
    posts,
    setPosts,
    emptyMessage,
}: {
    posts: Post[];
    setPosts: (val: Post[]) => void;
    emptyMessage: string;
}) {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    // Check if the current user has liked the post
    const isPostLikedByUser = (post: Post) => {
        return user && post.likes.some((like) => like.userId === user.id);
    };

    // Handle like
    const handleLike = async (postId: string) => {
        if (user) {
            await createLike(postId, { userId: user.id });
            updatePostLikes(postId, true);
        }
    };

    // Handle unlike
    const handleUnlike = async (postId: string) => {
        if (user) {
            await deleteLike(postId, { userId: user.id });
            updatePostLikes(postId, false);
        }
    };

    // Update the likes in the posts state
    const updatePostLikes = (postId: string, isLiked: boolean) => {
        const updatedPosts = posts.map((post) => {
            if (user && post.id === postId) {
                return {
                    ...post,
                    likes: isLiked
                        ? [...post.likes, { userId: user.id, postId }]
                        : post.likes.filter((like) => like.userId !== user.id),
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

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
                                <button
                                    className="w-fit"
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    <p className="underline">{post.title}</p>
                                </button>
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
                                    {isPostLikedByUser(post) ? (
                                        <button
                                            onClick={() =>
                                                handleUnlike(post.id)
                                            }
                                        >
                                            <p className="text-salmon">
                                                <i className="ri-heart-fill"></i>
                                                {post.likes.length}
                                            </p>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleLike(post.id)}
                                        >
                                            <p>
                                                <i className="ri-heart-fill"></i>
                                                {post.likes.length}
                                            </p>
                                        </button>
                                    )}

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
