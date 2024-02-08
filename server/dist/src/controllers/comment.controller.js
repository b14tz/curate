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
exports.deleteComment = exports.createComment = exports.getAllPostComments = void 0;
const db_server_1 = require("../utils/db.server");
const getAllPostComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const comments = yield db_server_1.db.postComment.findMany({
            where: { postId },
            include: { author: true },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).send(comments);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllPostComments = getAllPostComments;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, userId, postId, } = req.body;
        const comment = yield db_server_1.db.postComment.create({
            data: { authorId: userId, postId, content },
            include: { author: true },
        });
        return res.status(200).send(comment);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createComment = createComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedComment = yield db_server_1.db.postComment.delete({
            where: { id },
            include: { post: true },
        });
        return res.status(200).json(deletedComment);
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteComment = deleteComment;
