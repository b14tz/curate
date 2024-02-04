import { IconCornerDownRight, IconUser } from "@tabler/icons-react";
import { Heart, MessageCircle, RefreshCcwDot } from "lucide-react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createLike, deleteLike } from "@/api/routes/like";
import { getPost, savePost } from "@/api/routes/post";
import CommentBox from "@/components/CommentBox";
import StyledNavLink from "@/components/StyledNavLink";
import AppleAuthButton from "@/components/apple/AppleAuthButton";
import Modal from "@/components/ui/Modal";
import { isAppleTokenExpired } from "@/redux/features/apple/appleSlice";
import { isSpotifyTokenExpired } from "@/redux/features/spotify/spotifySlice";
import { RootState } from "@/redux/store";
import { formatPostTime } from "@/utils/time";

export default function PostPage({ showComments = false }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [openSave, setOpenSave] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState("");

    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );
    const appleToken = useSelector((state: RootState) => state.appleReducer);
    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );

    const [post, setPost] = useState<Post>({
        id: "",
        title: "",
        description: "",
        songs: [],
        origin: "",
        saves: 0,
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

    const handleSave = async () => {
        const postId = post.id;
        const destination = selectedRadio;
        let destinationUserToken = "";

        if (destination === "spotify" && spotifyToken.accessToken) {
            destinationUserToken = spotifyToken.accessToken;
        } else if (destination === "apple" && appleToken.musicUserToken) {
            destinationUserToken = appleToken.musicUserToken;
        }
        console.log({ postId, destination, destinationUserToken });

        try {
            await savePost({ id: postId, destination, destinationUserToken });
            setOpenSave(false);
        } catch (error) {
            console.error("Error saving post:", error);
        }
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

    useEffect(() => {
        async function populatePost() {
            if (id) {
                const data = await getPost(id);
                setPost(data);
            }
        }

        populatePost();
    }, [id]);

    return (
        <>
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                    <h3>{post?.title}</h3>
                    <p>{post?.description}</p>
                </div>
                <div className="flex flex-row justify-between items-end">
                    <div className="flex flex-row items-center space-x-10">
                        <button onClick={() => navigate(`/post/${id}`)}>
                            <p>{post.total} songs</p>
                        </button>
                        {currentUser &&
                        post.likes.find(
                            (like) => like.userId == currentUser.id
                        ) ? (
                            <button onClick={() => handleUnlike()}>
                                <p className="text-salmon">
                                    <Heart
                                        size={18}
                                        color="salmon"
                                        fill="salmon"
                                    />
                                    {post.likes.length}
                                </p>
                            </button>
                        ) : (
                            <button
                                className="flex space-x-1 items-center"
                                onClick={() => handleLike()}
                            >
                                <Heart size={18} />
                                <p>{post.likes.length}</p>
                            </button>
                        )}

                        <button
                            className="flex space-x-1 items-center"
                            onClick={() => navigate(`/post/${id}/comments`)}
                        >
                            <MessageCircle size={18} />
                            <p>{post.comments.length}</p>
                        </button>
                        <button
                            className="flex space-x-2 items-center"
                            onClick={() => setOpenSave(true)}
                        >
                            <div className="flex items-center space-x-1">
                                <RefreshCcwDot size={18} />
                                <p>{post.saves}</p>
                            </div>
                        </button>
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
            <Modal
                open={openSave}
                handleClose={() => setOpenSave(false)}
                title="Save Playlist"
            >
                <div className="flex flex-col space-y-2 min-w-[400px]">
                    <div className="space-y-2">
                        <p className="text-lg font-medium">Destination</p>
                        <div>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRadio("spotify")}
                                    className="flex p-3 block w-full bg-b-secondary hover:bg-snow border-2 border-b-primary rounded-lg text-sm focus:ring-1 focus:border-salmon focus:ring-salmon"
                                    disabled={isSpotifyTokenExpired(
                                        spotifyToken
                                    )}
                                >
                                    <div className="flex flex-col items-start">
                                        <p className="text-sm text-gray-500">
                                            Spotify
                                        </p>
                                    </div>
                                    <input
                                        type="radio"
                                        name="radio-post-origin"
                                        className="accent-salmon shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-salmon disabled:opacity-50 disabled:pointer-events-none"
                                        checked={selectedRadio === "spotify"}
                                        readOnly
                                        disabled={isSpotifyTokenExpired(
                                            spotifyToken
                                        )}
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedRadio("apple")}
                                    className="flex p-3 block w-full bg-b-secondary hover:bg-snow border-2 border-b-primary rounded-lg text-sm focus:ring-1 focus:border-salmon focus:ring-salmon"
                                    disabled={isAppleTokenExpired(appleToken)}
                                >
                                    <p className="text-sm text-gray-500">
                                        Apple Music
                                    </p>

                                    <input
                                        type="radio"
                                        name="radio-post-origin"
                                        className="accent-salmon shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-salmon disabled:opacity-50 disabled:pointer-events-none"
                                        checked={selectedRadio === "apple"}
                                        readOnly
                                        disabled={isAppleTokenExpired(
                                            appleToken
                                        )}
                                    />
                                </button>
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-1/2 pl-3">
                                    {isSpotifyTokenExpired(spotifyToken) ? (
                                        <button
                                            type="button"
                                            className="text-xs underline"
                                            onClick={() => {
                                                window.location.href = `${
                                                    import.meta.env
                                                        .VITE_SERVER_URL
                                                }/spotify/auth`;
                                            }}
                                        >
                                            Connect to Spotify
                                        </button>
                                    ) : null}
                                </div>
                                <div className="w-1/2 pl-3">
                                    <AppleAuthButton />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="self-end w-fit bg-salmon text-white px-3 py-1 rounded-md"
                        onClick={() => handleSave()}
                    >
                        Save
                    </button>
                </div>
            </Modal>
        </>
    );
}
