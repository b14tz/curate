import { isSpotifyTokenExpired } from "@/redux/features/spotify/spotifySlice";
import AppleAuthButton from "./apple/AppleAuthButton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { isAppleTokenExpired } from "@/redux/features/apple/appleSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { savePost } from "@/api/routes/post";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function SaveModal({
    children,
    post,
}: {
    children: JSX.Element;
    post: Post;
}) {
    const appleToken = useSelector((state: RootState) => state.appleReducer);
    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );

    const [selectedRadio, setSelectedRadio] = useState("");

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
            await savePost({
                id: postId,
                destination,
                destinationUserToken,
            });
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    useEffect(() => {
        if (spotifyToken) {
            setSelectedRadio("spotify");
        } else if (appleToken) {
            setSelectedRadio("apple");
        }
    }, [spotifyToken, appleToken]);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save Post</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Select a platform to save this playlist to.
                </DialogDescription>
                <div className="flex flex-col space-y-2 ">
                    <div className="space-y-2">
                        <div>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRadio("spotify")}
                                    className="flex p-3 block w-full hover:bg-silver border-2 rounded-lg text-sm focus:ring-1 focus:border-primary focus:ring-primary"
                                    disabled={isSpotifyTokenExpired(
                                        spotifyToken
                                    )}
                                >
                                    <div className="flex flex-col items-start">
                                        <p className="text-sm">Spotify</p>
                                    </div>
                                    <input
                                        type="radio"
                                        name="radio-post-origin"
                                        className="accent-primary shrink-0 ms-auto mt-0.5 border-silver rounded-full text-primary disabled:opacity-50 disabled:pointer-events-none"
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
                                    className="flex p-3 block w-full hover:bg-silver border-2 rounded-lg text-sm focus:ring-1 focus:border-primary focus:ring-primary"
                                    disabled={isAppleTokenExpired(appleToken)}
                                >
                                    <p className="text-sm">Apple Music</p>

                                    <input
                                        type="radio"
                                        name="radio-post-origin"
                                        className="accent-primarynpx shrink-0 ms-auto mt-0.5 border-silver rounded-full text-primary disabled:opacity-50 disabled:pointer-events-none"
                                        checked={selectedRadio === "apple"}
                                        readOnly
                                        disabled={isAppleTokenExpired(
                                            appleToken
                                        )}
                                    />
                                </button>
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-1/2">
                                    {isSpotifyTokenExpired(spotifyToken) ? (
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="text-xs underline text-silver"
                                            onClick={() => {
                                                window.location.href = `${
                                                    import.meta.env
                                                        .VITE_SERVER_URL
                                                }/spotify/auth`;
                                            }}
                                        >
                                            Connect to Spotify
                                        </Button>
                                    ) : null}
                                </div>
                                <div className="w-1/2">
                                    <AppleAuthButton />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        className="px-3 py-1 rounded-md"
                        onClick={() => handleSave()}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
