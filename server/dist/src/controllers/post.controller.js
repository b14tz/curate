"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = exports.getFollowerPosts = exports.getAllPosts = exports.getPost = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const db_server_1 = require("../utils/db.server");
const apple_controller_1 = require("./apple.controller");
const spotify_client_token_1 = require("../utils/spotify-client-token");
const axios_1 = __importDefault(require("axios"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const result = yield db_server_1.db.post.create({
            data: Object.assign(Object.assign({}, data), { downloads: 0 }),
        });
        return res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error creating post`);
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    try {
        yield db_server_1.db.post.update({ where: { id }, data: Object.assign({}, data) });
        return res.status(200).send("Successfully updated post");
    }
    catch (error) {
        return res.status(500).send("Error updating user");
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield db_server_1.db.post.delete({ where: { id } });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error deleting user`);
    }
});
exports.deletePost = deletePost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const post = yield db_server_1.db.post.findUnique({
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
            const songs = yield fetchSpotifyPlaylistById(post.originId);
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
        }
        else {
            return res.status(404).send({ message: "Post not found" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting post data`);
    }
});
exports.getPost = getPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db_server_1.db.post.findMany({
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
        const formattedPostsPromises = posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                id: post.id,
                title: post.title,
                description: post.description,
                songs: post.origin === "spotify"
                    ? yield fetchSpotifyPlaylistById(post.originId)
                    : yield (0, apple_controller_1.fetchApplePlaylistById)(post.originId),
                origin: post.origin,
                downloads: post.downloads,
                createdAt: post.createdAt,
                author: post.author,
                likes: post.likes || [],
                comments: post.comments || [],
            });
        }));
        // Await all the promises
        const formattedPosts = yield Promise.all(formattedPostsPromises);
        return res.status(200).send(formattedPosts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all posts`);
    }
});
exports.getAllPosts = getAllPosts;
const getFollowerPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const follows = yield db_server_1.db.follow.findMany({
            where: { followerId: id },
        });
        const followingIds = follows.map((follow) => follow.followingId);
        followingIds.push(id);
        const posts = yield db_server_1.db.post.findMany({
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
        const formattedPostsPromises = posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                id: post.id,
                title: post.title,
                description: post.description,
                songs: post.origin === "spotify"
                    ? yield fetchSpotifyPlaylistById(post.originId)
                    : yield (0, apple_controller_1.fetchApplePlaylistById)(post.originId),
                origin: post.origin,
                downloads: post.downloads,
                createdAt: post.createdAt,
                author: post.author,
                likes: post.likes || [],
                comments: post.comments || [],
            });
        }));
        // Await all the promises
        const formattedPosts = yield Promise.all(formattedPostsPromises);
        return res.status(200).send(formattedPosts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all follower posts`);
    }
});
exports.getFollowerPosts = getFollowerPosts;
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const posts = yield db_server_1.db.post.findMany({
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
        const formattedPostsPromises = posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                id: post.id,
                title: post.title,
                description: post.description,
                songs: post.origin === "spotify"
                    ? yield fetchSpotifyPlaylistById(post.originId)
                    : yield (0, apple_controller_1.fetchApplePlaylistById)(post.originId),
                origin: post.origin,
                downloads: post.downloads,
                createdAt: post.createdAt,
                author: post.author,
                likes: post.likes || [],
                comments: post.comments || [],
            });
        }));
        // Await all the promises
        const formattedPosts = yield Promise.all(formattedPostsPromises);
        return res.status(200).send(formattedPosts);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getUserPosts = getUserPosts;
const fetchSpotifyPlaylistById = (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, spotify_client_token_1.getClientToken)();
        const playlistData = yield (0, axios_1.default)({
            method: "get",
            url: `https://api.spotify.com/v1/playlists/${playlistId}`,
            headers: { Authorization: `Bearer ${token}` },
        });
        const songs = playlistData.data.tracks.items.map((song) => {
            var _a, _b, _c, _d, _e;
            return ({
                id: (_a = song.track) === null || _a === void 0 ? void 0 : _a.id,
                title: (_b = song.track) === null || _b === void 0 ? void 0 : _b.name,
                artist: (_c = song.track) === null || _c === void 0 ? void 0 : _c.artists[0].name,
                imageUrl: (_e = (_d = song.track) === null || _d === void 0 ? void 0 : _d.album.images[0]) === null || _e === void 0 ? void 0 : _e.url,
            });
        });
        return songs;
    }
    catch (error) {
        console.error("Error fetch spotify playlist by id", error);
    }
});
