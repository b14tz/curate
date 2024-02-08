import { Request, Response } from "express";

import { db } from "../utils/db.server";
import {
    createSpotifyPlaylist,
    getIsrcsBySpotifyPlaylistId,
    getSpotifyPlaylistByIdInternal,
    getTrackUrisByIsrcs,
    getTrackUrisBySpotifyPlaylistId,
} from "./spotify.controller";
import {
    createApplePlaylist,
    getApplePlaylistByIdInternal,
    getIsrcsByApplePlaylistId,
    getSongIdsByApplePlaylistId,
    getSongIdsByIsrcs,
} from "./apple.controller";

export const createPost = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await db.post.create({
            data: { ...data, saves: 0 },
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
        const updatedPost = await db.post.update({
            where: { id },
            data: { ...data },
        });
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).send("Error updating user");
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const deletedPost = await db.post.delete({ where: { id } });
        return res.status(204).json(deletedPost);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error deleting user`);
    }
};

export const savePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { destination, destinationUserToken } = req.body;

    try {
        const post = await db.post.findUnique({
            where: { id },
        });

        if (!post) {
            return res.status(404).send("Post not found");
        }

        const { origin, originId, title, description } = post;
        let dataForDestination: any;

        if (origin === "spotify" && destination === "spotify") {
            // Spotify to Spotify
            const trackUris = await getTrackUrisBySpotifyPlaylistId(originId);
            dataForDestination = {
                title,
                description,
                ids: trackUris,
                accessToken: destinationUserToken,
            };
        } else if (origin === "spotify" && destination === "apple") {
            // Spotify to Apple
            const isrcs = await getIsrcsBySpotifyPlaylistId(originId);
            const appleTrackUris = await getSongIdsByIsrcs(isrcs);
            dataForDestination = {
                title,
                description,
                ids: appleTrackUris,
                musicUserToken: destinationUserToken,
            };
        } else if (origin === "apple" && destination === "apple") {
            // Apple to Apple
            const songIds = await getSongIdsByApplePlaylistId(originId);
            dataForDestination = {
                title,
                description,
                ids: songIds,
                musicUserToken: destinationUserToken,
            };
        } else if (origin === "apple" && destination === "spotify") {
            // Apple to Spotify
            const isrcs = await getIsrcsByApplePlaylistId(originId);
            const trackUris = await getTrackUrisByIsrcs(isrcs);
            dataForDestination = {
                title,
                description,
                ids: trackUris,
                accessToken: destinationUserToken,
            };
        }

        if (destinationUserToken) {
            if (destination === "spotify") {
                await createSpotifyPlaylist(dataForDestination);
            } else if (destination === "apple") {
                await createApplePlaylist(dataForDestination);
            }
        }

        await db.post.update({
            where: { id },
            data: { saves: { increment: 1 } },
        });

        if (post.authorId) {
            await db.user.update({
                where: { id: post.authorId },
                data: { saves: { increment: 1 } },
            });
        }

        return res.status(200).json({ message: "Successfully saved post" });
    } catch (error) {
        console.error("Error in saving playlist:", error);
        return res.status(500).send("Error in saving playlist");
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

        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }

        const formattedPost = await formatPost(post);
        return res.status(200).send(formattedPost);
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

        const formattedPosts = await Promise.all(
            posts.map((post) => formatPost(post))
        );

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

        const formattedPosts = await Promise.all(
            posts.map((post) => formatPost(post))
        );

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

        const formattedPosts = await Promise.all(
            posts.map((post) => formatPost(post))
        );

        return res.status(200).send(formattedPosts);
    } catch (error) {
        console.error(error);
    }
};

async function formatPost(post: any) {
    const fetchedData: any =
        post.origin === "spotify"
            ? await getSpotifyPlaylistByIdInternal(post.originId)
            : await getApplePlaylistByIdInternal(post.originId);
    return {
        id: post.id,
        title: post.title,
        description: post.description,
        songs: fetchedData.songs,
        origin: post.origin,
        saves: post.saves,
        createdAt: post.createdAt,
        author: post.author,
        total: fetchedData.total,
        next: fetchedData.next,
        likes: post.likes || [],
        comments: post.comments || [],
    };
}
