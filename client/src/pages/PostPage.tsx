import { IconCornerDownRight, IconUser } from "@tabler/icons-react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createLike, deleteLike } from "~/api/routes/like";
import { getPost } from "~/api/routes/post";
import { ButtonGroup } from "~/components/ButtonGroup";
import CommentBox from "~/components/CommentBox";
import { RootState } from "~/redux/store";
import { formatPostTime } from "~/utils/time";

export default function PostPage() {
    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const { enqueueSnackbar } = useSnackbar();

    const [post, setPost] = useState<Post>({
        id: "",
        title: "",
        description: "",
        songs: [],
        origin: "",
        downloads: 0,
        createdAt: "",
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
    const [showSongs, setShowSongs] = useState(true);

    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );

    useEffect(() => {
        async function populatePost() {
            if (id) {
                const data = await getPost(id);
                setPost(data);
            }
        }

        const searchParams = new URLSearchParams(location.search);
        let path = searchParams.get("path");

        if (!path) {
            navigate(`${location.pathname}?path=songs`);
            path = "songs";
        }

        setShowSongs(path === "songs");
        populatePost();
    }, [id, location.search]);

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

    const handleShowSongs = () => {
        navigate(`${location.pathname}?path=songs`);
    };

    const handleShowComments = () => {
        navigate(`${location.pathname}?path=comments`);
    };

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
                    <div className="flex flex-col space-y-8 mt-4">
                        {post?.songs.map((song) => (
                            <div
                                key={song.imageUrl + song.artist + song.title}
                                className="flex flex-row space-x-4 items-center"
                            >
                                <img
                                    key={"image" + song.imageUrl}
                                    src={song.imageUrl}
                                    className="w-28 h-28"
                                />
                                <div className="flex flex-col space-y-2">
                                    <h3>{song.title}</h3>
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
                    <button onClick={() => handleShowSongs()}>
                        <p>
                            <i className="ri-music-2-fill"></i>
                            {post?.songs.length}
                        </p>
                    </button>
                    {currentUser &&
                    post?.likes.find(
                        (like) => like.userId == currentUser.id
                    ) ? (
                        <button onClick={() => handleUnlike()}>
                            <p className="text-salmon">
                                <i className="ri-heart-fill"></i>
                                {post?.likes.length}
                            </p>
                        </button>
                    ) : (
                        <button onClick={() => handleLike()}>
                            <p>
                                <i className="ri-heart-fill"></i>
                                {post?.likes.length}
                            </p>
                        </button>
                    )}

                    <button onClick={() => handleShowComments()}>
                        <p>
                            <i className="ri-chat-1-fill"></i>
                            {post?.comments.length}
                        </p>
                    </button>
                    <p>
                        <i className="ri-download-fill"></i>
                        {post?.downloads}
                    </p>
                </div>

                <button
                    className="w-fit flex items-center space-x-1"
                    onClick={() => navigate(`/user/${post?.author.id}`)}
                >
                    <IconUser size={20} />
                    <p>{post?.author.displayName}</p>
                </button>
            </div>
            <hr />
            <ButtonGroup
                buttonClasses=""
                groupClasses="space-x-8"
                activeClasses=" border-b-2 border-solid border-salmon"
                groupButtons={[
                    {
                        label: "Songs",
                        value: "songs",
                        onClick: () => handleShowSongs(),
                    },
                    {
                        label: "Comments",
                        value: "comments",
                        onClick: () => handleShowComments(),
                    },
                ]}
            />

            <div className="flex flex-col space-y-2">
                {showSongs ? (
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
