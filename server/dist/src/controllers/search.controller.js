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
exports.searchPosts = exports.searchUsers = void 0;
const db_server_1 = require("../utils/db.server");
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.body.query;
    if (!query) {
        return res.status(400).send("Query parameter is required");
    }
    try {
        const users = yield db_server_1.db.user.findMany({
            where: {
                displayName: {
                    contains: query,
                    //mode: "insensitive",
                },
            },
            include: {
                followers: true,
                following: true,
            },
        });
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.searchUsers = searchUsers;
const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.body.query;
    if (!query) {
        return res.status(400).send("Query parameter is required");
    }
    try {
        const posts = yield db_server_1.db.post.findMany({
            where: {
                title: {
                    contains: query,
                    //mode: "insensitive",
                },
            },
            include: {
                author: true,
            },
        });
        res.json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.searchPosts = searchPosts;
