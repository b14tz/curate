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
exports.deleteLike = exports.createLike = exports.getAllPostLikes = void 0;
const db_server_1 = require("../utils/db.server");
const getAllPostLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const likes = yield db_server_1.db.postLike.findMany({ where: { postId } });
        return res.status(200).send(likes);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllPostLikes = getAllPostLikes;
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const like = yield db_server_1.db.postLike.create({
            data: {
                postId,
                userId,
            },
        });
        return res.status(200).send(like);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createLike = createLike;
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        yield db_server_1.db.postLike.delete({
            where: {
                userId_postId: {
                    postId: postId,
                    userId: userId,
                },
            },
        });
        return res.status(200).send("Successfully deleted like");
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteLike = deleteLike;
