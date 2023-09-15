import { useEffect, useState } from "react";
import { formatPostTime } from "./utils/time";
import { samplePostData } from "./utils/sampleData";
import { populateSpotifyFeed } from "./api/routes/spotify";
export default function Feed({ type }: { type: string }) {
    const [spotifyPosts, setSpotifyPosts] = useState([]);
    const [friendsPosts, setFriendsPosts] = useState(samplePostData);
    const [popularPosts, setPopularPosts] = useState([]);

    useEffect(() => {
        async function populateSpotifyPosts() {
            const data = await populateSpotifyFeed();
            console.log(data);
            setSpotifyPosts(data);
        }
        populateSpotifyPosts();
    }, []);

    const renderFeed = (posts: Post[]) => {
        return (
            <div className="flex flex-col space-y-8">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex flex-row space-x-2 items-center"
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

                        <div className="flex flex-col max-w-[300px]">
                            <p className="underline">{post.title}</p>
                            <div className="flex flex-row space-x-10">
                                <p>{post.author}</p>
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
                            <p>{post.description}</p>
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
    };
    return (
        <>
            {type === "spotify" ? (
                <p>a collection of playlists recommended by spotify</p>
            ) : type === "friends" ? (
                <p>playlists posted by your friends</p>
            ) : (
                <p>the latest and greatest playlists on the site</p>
            )}

            {renderFeed(
                type === "spotify"
                    ? spotifyPosts
                    : type === "friends"
                    ? friendsPosts
                    : popularPosts
            )}
        </>
    );
}
