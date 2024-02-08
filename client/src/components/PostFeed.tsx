import { useNavigate } from "react-router-dom";
import { formatPostTime } from "../utils/time";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSnackbar } from "notistack";
import { CircleUserRound, Heart, MessageCircle } from "lucide-react";
import Preview from "./Preview";
import {
    useCreateLikeMutation,
    useDeleteLikeMutation,
} from "@/redux/api/routes/like";

export default function PostFeed({
    posts,
    emptyMessage,
}: {
    posts: Post[];
    emptyMessage: string;
}) {
    const [createLike] = useCreateLikeMutation();
    const [deleteLike] = useDeleteLikeMutation();
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
            await createLike({
                userId: currentUser.id,
                postId: postId,
            }).unwrap();
        } else {
            enqueueSnackbar("You must be logged in to like a post.", {
                autoHideDuration: 2000,
            });
        }
    };

    // Handle unlike
    const handleUnlike = async (postId: string) => {
        if (currentUser) {
            await deleteLike({
                userId: currentUser.id,
                postId: postId,
            }).unwrap();
        }
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
                            className="flex flex-row space-x-4 w-full items-center"
                        >
                            <div className="w-[55%]">
                                <Preview
                                    source={post}
                                    path={`/post/${post.id}`}
                                />
                            </div>

                            <div className="flex flex-col w-[380px] flex-shrink-0 self-start mt-2 space-y-1">
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
                                    <div className="flex flex-row space-x-2 justify-center">
                                        <p>{post.total}</p>
                                        <p>songs</p>
                                    </div>

                                    {isPostLikedByUser(post) ? (
                                        <button
                                            className="flex space-x-1 items-center"
                                            onClick={() =>
                                                handleUnlike(post.id)
                                            }
                                        >
                                            <Heart
                                                size={18}
                                                className="fill-primary text-primary"
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
                                    <button
                                        className="w-fit flex space-x-1 items-center"
                                        onClick={() =>
                                            navigate(
                                                `/post/${post.id}/comments`
                                            )
                                        }
                                    >
                                        <MessageCircle size={18} />
                                        <p>{post.comments.length}</p>
                                    </button>
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

{
    /* <button
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
    </button> */
}
