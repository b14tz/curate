import { useState } from "react";
import { formatPostTime } from "./utils/time";
export default function Feed({ type }: { type: string }) {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            title: "playlist 1",
            author: "marshall",
            description: "this is my test post description",
            createdAt: new Date(),
            songs: [
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
            ],
            downloads: 0,
            likes: [],
            comments: [],
        },
        {
            id: 2,
            title: "another playlist",
            author: "marshall",
            description: "this is my test post description",
            createdAt: new Date(),
            songs: [
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
            ],
            downloads: 0,
            likes: [],
            comments: [],
        },
        {
            id: 3,
            title: "songs of the summer",
            author: "marshall",
            description: "this is my test post description",
            createdAt: new Date(),
            songs: [
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273940d3e05f0010f8293e64164",
                },
            ],
            downloads: 0,
            likes: [],
            comments: [],
        },
    ]);
    const renderFeed = () => {
        return (
            <div className="flex flex-col space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex flex-row space-x-2 items-center"
                    >
                        {post.songs.map((song) => (
                            <img src={song.imageUrl} className="w-28 h-28" />
                        ))}

                        <div className="flex flex-col">
                            <h3>{post.title}</h3>
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
                            <p>{formatPostTime(post.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    return <>{type === "spotify" ? <>{renderFeed()}</> : <p>bye</p>}</>;
}
