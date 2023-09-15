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
                    id: 1,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 2,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 3,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
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
                    id: 1,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 2,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 3,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
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
            description: "this is my test post description. this is",
            createdAt: new Date(),
            songs: [
                {
                    id: 1,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 2,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 3,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 4,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 5,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 6,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 7,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 8,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 9,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 10,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 11,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
                },
                {
                    id: 12,
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://i.scdn.co/image/ab67616d0000b273935d8d5369bc55e74a39303e",
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

                        <div className="flex flex-col ">
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
                            <p>{formatPostTime(post.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    return <>{type === "spotify" ? <>{renderFeed()}</> : <p>bye</p>}</>;
}
