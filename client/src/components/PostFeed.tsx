import { useNavigate } from "react-router-dom";
import { formatPostTime } from "../utils/time";
import { createLike, deleteLike } from "@/api/routes/like";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSnackbar } from "notistack";
import { CircleUserRound, Heart, MessageCircle } from "lucide-react";

export default function PostFeed({
    posts,
    emptyMessage,
}: {
    posts: Post[];
    emptyMessage: string;
}) {
    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // Check if the current user has liked the post
    const isPostLikedByUser = (post: Post) => {
        return (
            currentUser &&
            post.likes.some((like) => like.userId === currentUser.id)
        );
    };

    // Handle like
    const handleLike = async (postId: string) => {
        if (currentUser) {
            await createLike(postId, { userId: currentUser.id });
            updatePostLikes(postId, true);
        } else {
            enqueueSnackbar("You must be logged in to like a post.", {
                autoHideDuration: 2000,
            });
        }
    };

    // Handle unlike
    const handleUnlike = async (postId: string) => {
        if (currentUser) {
            await deleteLike(postId, { userId: currentUser.id });
            updatePostLikes(postId, false);
        }
    };

    // Update the likes in the posts state
    const updatePostLikes = (postId: string, isLiked: boolean) => {
        const updatedPosts = posts.map((post) => {
            if (currentUser && post.id === postId) {
                return {
                    ...post,
                    likes: isLiked
                        ? [...post.likes, { userId: currentUser.id, postId }]
                        : post.likes.filter(
                              (like) => like.userId !== currentUser.id
                          ),
                };
            }
            return post;
        });
        console.log("Handle updated posts here: ", updatedPosts);
        // setPosts(updatedPosts);
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
                <div className="flex flex-col space-y-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-row space-x-4 items-center"
                        >
                            <button
                                className="flex flex-row drop-shadow-xl"
                                onClick={() => navigate(`/post/${post.id}`)}
                            >
                                {Array.from({ length: 7 }).map((_, index) => {
                                    const song = post.songs[index];
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

                            <div className="flex flex-col max-w-[380px] self-start mt-2 space-y-1">
                                <button
                                    className="w-fit"
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    <p className="text-xl font-bold">
                                        {post.title}
                                    </p>
                                </button>
                                <div className="flex flex-row space-x-8 items-center text-silver">
                                    <button
                                        className="flex space-x-1 items-center"
                                        onClick={() =>
                                            navigate(`/user/${post.author.id}`)
                                        }
                                    >
                                        <CircleUserRound size={18} />
                                        <p>{post.author.displayName}</p>
                                    </button>
                                    <p>{post.total} songs</p>

                                    {isPostLikedByUser(post) ? (
                                        <button
                                            className="flex space-x-1 items-center"
                                            onClick={() =>
                                                handleUnlike(post.id)
                                            }
                                        >
                                            <Heart
                                                size={18}
                                                color="salmon"
                                                fill="salmon"
                                            />
                                            <p>{post.likes.length}</p>
                                        </button>
                                    ) : (
                                        <button
                                            className="flex space-x-1 items-center"
                                            onClick={() => handleLike(post.id)}
                                        >
                                            <Heart size={18} />
                                            <p>{post.likes.length}</p>
                                        </button>
                                    )}
                                    <div className="flex space-x-1 items-center">
                                        <MessageCircle size={18} />
                                        <p>{post.comments.length}</p>
                                    </div>
                                    <p>
                                        {post.createdAt
                                            ? formatPostTime(post.createdAt)
                                            : "*"}
                                    </p>
                                </div>
                                <p className="text-ellipsis	whitespace-nowrap overflow-hidden text-silver">
                                    {post.description ?? ""}
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
