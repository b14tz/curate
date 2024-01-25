import { Request, Response } from "express";

import { db } from "../utils/db.server";
import { getClientToken } from "../utils/spotifyClientToken";
import axios from "axios";
import { getAppleDeveloperTokenCached } from "./apple.controller";

export const createPost = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await db.post.create({
            data: { ...data, downloads: 0 },
        });
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error creating post`);
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
        await db.post.update({ where: { id }, data: { ...data } });
        return res.status(200).send("Successfully updated post");
    } catch (error) {
        return res.status(500).send("Error updating user");
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await db.post.delete({ where: { id } });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error deleting user`);
    }
};

export const getPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const post = await db.post.findUnique({
            where: { id },
            include: {
                author: true,
                likes: true,
                comments: {
                    include: {
                        author: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        if (post) {
            const songs =
                post.origin === "spotify"
                    ? await fetchSpotifyPlaylistById(post.originId)
                    : await fetchApplePlaylistById(post.originId);
            const formattedPost = {
                id: post.id,
                title: post.title,
                description: post.description,
                songs: songs,
                origin: post.origin,
                downloads: post.downloads,
                createdAt: post.createdAt,
                author: post.author,
                likes: post.likes || [],
                comments: post.comments || [],
            };
            return res.status(200).send(formattedPost);
        } else {
            return res.status(404).send({ message: "Post not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting post data`);
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await db.post.findMany({
            include: {
                author: {
                    include: {
                        followers: true,
                        following: true,
                        likes: true,
                        comments: true,
                        posts: true,
                    },
                },
                likes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Create an array of promises
        const formattedPostsPromises = posts.map(async (post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            songs:
                post.origin === "spotify"
                    ? await fetchSpotifyPlaylistById(post.originId)
                    : await fetchApplePlaylistById(post.originId),
            origin: post.origin,
            downloads: post.downloads,
            createdAt: post.createdAt,
            author: post.author,
            likes: post.likes || [],
            comments: post.comments || [],
        }));

        // Await all the promises
        const formattedPosts = await Promise.all(formattedPostsPromises);
        return res.status(200).send(formattedPosts);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all posts`);
    }
};

export const getFollowerPosts = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const follows = await db.follow.findMany({
            where: { followerId: id },
        });
        const followingIds = follows.map((follow) => follow.followingId);
        followingIds.push(id);
        const posts = await db.post.findMany({
            where: { authorId: { in: followingIds } },
            include: {
                author: {
                    include: {
                        followers: true,
                        following: true,
                        likes: true,
                        comments: true,
                        posts: true,
                    },
                },
                likes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Create an array of promises
        const formattedPostsPromises = posts.map(async (post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            songs:
                post.origin === "spotify"
                    ? await fetchSpotifyPlaylistById(post.originId)
                    : await fetchApplePlaylistById(post.originId),
            origin: post.origin,
            downloads: post.downloads,
            createdAt: post.createdAt,
            author: post.author,
            likes: post.likes || [],
            comments: post.comments || [],
        }));

        // Await all the promises
        const formattedPosts = await Promise.all(formattedPostsPromises);
        return res.status(200).send(formattedPosts);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all follower posts`);
    }
};

export const getUserPosts = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const posts = await db.post.findMany({
            where: { authorId: id },
            include: {
                author: {
                    include: {
                        followers: true,
                        following: true,
                        likes: true,
                        comments: true,
                        posts: true,
                    },
                },
                likes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Create an array of promises
        const formattedPostsPromises = posts.map(async (post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            songs:
                post.origin === "spotify"
                    ? await fetchSpotifyPlaylistById(post.originId)
                    : await fetchApplePlaylistById(post.originId),
            origin: post.origin,
            downloads: post.downloads,
            createdAt: post.createdAt,
            author: post.author,
            likes: post.likes || [],
            comments: post.comments || [],
        }));

        // Await all the promises
        const formattedPosts = await Promise.all(formattedPostsPromises);
        return res.status(200).send(formattedPosts);
    } catch (error) {
        console.error(error);
    }
};

const fetchSpotifyPlaylistById = async (playlistId: string) => {
    try {
        const token = await getClientToken();
        const playlistData = await axios({
            method: "get",
            url: `https://api.spotify.com/v1/playlists/${playlistId}`,
            headers: { Authorization: `Bearer ${token}` },
        });

        const songs = playlistData.data.tracks.items.map((song: any) => ({
            id: song.track?.id,
            title: song.track?.name,
            artist: song.track?.artists[0].name,
            imageUrl: song.track?.album.images[0]?.url,
        }));
        return songs;
    } catch (error) {
        console.error("Error fetching spotify playlist by id: ", error);
        return [];
    }
};

export const fetchApplePlaylistById = async (playlistId: string) => {
    try {
        const developerToken = await getAppleDeveloperTokenCached();
        const playlistData = await axios({
            method: "get",
            url: `https://api.music.apple.com/v1/catalog/us/playlists/${playlistId}`,
            headers: { Authorization: `Bearer ${developerToken}` },
        });

        const songs = playlistData.data.data[0].relationships.tracks.data.map(
            (song: any) => ({
                id: song.id,
                title: song.attributes.name,
                artist: song.attributes.artistName,
                imageUrl: song.attributes.artwork.url
                    .replace("{w}", "600")
                    .replace("{h}", "600")
                    .replace("bb.jpg", "bb-60.jpg"),
            })
        );
        return songs;
    } catch (error) {
        console.error("Error fetching apple playlist by id: ", error);
        return [];
    }
};
