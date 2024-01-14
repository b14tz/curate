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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserPosts = exports.getAllFollowerPosts = exports.getAllPosts = exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = void 0;
const db_server_1 = require("../utils/db.server");
const sampleData_1 = require("../utils/sampleData");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    try {
        const result = yield db_server_1.db.post.create({
            data: Object.assign(Object.assign({}, data), { downloads: 0 }),
        });
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error creating post`);
    }
});
exports.createPost = createPost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const post = yield db_server_1.db.post.findFirst({
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
            const formattedPost = {
                id: post.id,
                title: post.title,
                description: post.description,
                songs: sampleData_1.sampleSongs,
                origin: post.origin,
                downloads: post.downloads,
                createdAt: post.createdAt,
                author: post.author,
                likes: post.likes || [],
                comments: post.comments || [],
            };
            return res.status(200).send(formattedPost);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error getting user data`);
    }
});
exports.getPost = getPost;
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
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db_server_1.db.post.findMany({
            include: {
                author: true,
                likes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const formattedPosts = posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            songs: sampleData_1.sampleSongs,
            origin: post.origin,
            downloads: post.downloads,
            createdAt: post.createdAt,
            author: post.author,
            likes: post.likes || [],
            comments: post.comments || [],
        }));
        return res.status(200).send(formattedPosts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all posts`);
    }
});
exports.getAllPosts = getAllPosts;
const getAllFollowerPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                author: true,
                likes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const formattedPosts = posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            songs: sampleData_1.sampleSongs,
            origin: post.origin,
            downloads: post.downloads,
            createdAt: post.createdAt,
            author: post.author,
            likes: post.likes || [],
            comments: post.comments || [],
        }));
        return res.status(200).send(formattedPosts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all follower posts`);
    }
});
exports.getAllFollowerPosts = getAllFollowerPosts;
const getAllUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const posts = yield db_server_1.db.post.findMany({
            where: { authorId: id },
            include: {
                author: true,
                likes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const formattedPosts = posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            songs: sampleData_1.sampleSongs,
            origin: post.origin,
            downloads: post.downloads,
            createdAt: post.createdAt,
            author: post.author,
            likes: post.likes || [],
            comments: post.comments || [],
        }));
        return res.status(200).send(formattedPosts);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllUserPosts = getAllUserPosts;
