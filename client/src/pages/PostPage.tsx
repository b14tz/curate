import { IconCornerDownRight, IconUser } from "@tabler/icons-react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createLike, deleteLike } from "~/api/routes/like";
import { getPost } from "~/api/routes/post";
import CommentBox from "~/components/CommentBox";
import StyledNavLink from "~/components/StyledNavLink";
import { RootState } from "~/redux/store";
import { formatPostTime } from "~/utils/time";

export default function PostPage({ showComments = false }) {
    const { id } = useParams();

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const [post, setPost] = useState<Post>({
        id: "",
        title: "",
        description: "",
        songs: [],
        origin: "",
        downloads: 0,
        createdAt: "",
        next: "",
        total: 0,
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
        comments: [],
        likes: [],
    });

    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );

    const handleLike = async () => {
        if (currentUser) {
            await createLike(post.id, { userId: currentUser.id });
            setPost({
                ...post,
                likes: [
                    ...post.likes,
                    { userId: currentUser.id, postId: post.id },
                ],
            });
        } else {
            enqueueSnackbar("You must be logged in to like a post.", {
                autoHideDuration: 2000,
            });
        }
    };

    const handleUnlike = async () => {
        if (currentUser && post) {
            await deleteLike(post.id, { userId: currentUser.id });
            setPost({
                ...post,
                likes: post.likes.filter(
                    (like) => like.userId !== currentUser.id
                ),
            });
        }
    };

    useEffect(() => {
        async function populatePost() {
            if (id) {
                const data = await getPost(id);
                console.log("POSTDATA: ", data);
                setPost(data);
            }
        }

        populatePost();
    }, [id]);

    const renderSongs = () => {
        if (post) {
            if (Object.keys(post?.songs).length === 0) {
                return (
                    <div className="h-[300px] flex justify-center items-center">
                        <p>It looks like this playlist is empty.</p>
                    </div>
                );
            } else {
                return (
                    <div className="flex flex-col space-y-2 mt-4">
                        {post.songs.map((song) => (
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

    const renderComments = () => {
        if (post) {
            if (Object.keys(post?.comments).length === 0) {
                return (
                    <div className="h-[100px] flex justify-center items-center">
                        <p>
                            There's no comments on this post yet. You could be
                            the first!
                        </p>
                    </div>
                );
            } else {
                return (
                    <div className="flex flex-col space-y-4">
                        {post?.comments.map((comment) => (
                            <div
                                key={comment.author + comment.content}
                                className="flex flex-col"
                            >
                                <div className="flex flex-row w-full justify-between">
                                    <p>{comment.author.displayName}</p>
                                    <p>{formatPostTime(comment.createdAt)}</p>
                                </div>
                                <div className="flex items-center">
                                    <IconCornerDownRight />
                                    <p>{comment.content}</p>
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
                <h3>{post?.title}</h3>
                <p>{post?.description}</p>
            </div>
            <div className="flex flex-row justify-between items-end">
                <div className="flex flex-row items-center space-x-10">
                    <button onClick={() => navigate(`/post/${id}`)}>
                        <p>
                            <i className="ri-music-2-fill"></i>
                            {post.total}
                        </p>
                    </button>
                    {currentUser &&
                    post.likes.find((like) => like.userId == currentUser.id) ? (
                        <button onClick={() => handleUnlike()}>
                            <p className="text-salmon">
                                <i className="ri-heart-fill"></i>
                                {post.likes.length}
                            </p>
                        </button>
                    ) : (
                        <button onClick={() => handleLike()}>
                            <p>
                                <i className="ri-heart-fill"></i>
                                {post.likes.length}
                            </p>
                        </button>
                    )}

                    <button onClick={() => navigate(`/post/${id}/comments`)}>
                        <p>
                            <i className="ri-chat-1-fill"></i>
                            {post.comments.length}
                        </p>
                    </button>
                    <p>
                        <i className="ri-download-fill"></i>
                        {post.downloads}
                    </p>
                </div>

                <button
                    className="w-fit flex items-center space-x-1"
                    onClick={() => navigate(`/user/${post?.author.id}`)}
                >
                    <IconUser size={20} />
                    <p>{post.author.displayName}</p>
                </button>
            </div>
            <hr />

            <div className="flex space-x-4">
                <StyledNavLink
                    to={`/post/${id}`}
                    label="Songs"
                    pendingClasses="text-black"
                    activeClasses="text-black border-b-2 border-salmon"
                    end
                />
                <StyledNavLink
                    to={`/post/${id}/comments`}
                    label="Comments"
                    pendingClasses="text-black"
                    activeClasses="text-black border-b-2 border-salmon"
                />
            </div>

            <div className="flex flex-col space-y-2">
                {!showComments ? (
                    <>{renderSongs()}</>
                ) : (
                    <div className="flex flex-col space-y-2">
                        <CommentBox post={post} setPost={setPost} />
                        <div>{renderComments()}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
