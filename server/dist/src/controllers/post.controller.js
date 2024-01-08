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
exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = void 0;
const db_server_1 = require("../utils/db.server");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const result = yield db_server_1.db.post.create({ data: Object.assign({}, data) });
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
        const result = yield db_server_1.db.user.findFirst({ where: { id } });
        return res.status(200).send(result);
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
        yield db_server_1.db.user.update({ where: { id }, data: Object.assign({}, data) });
    }
    catch (error) {
        return res.status(500).send("Error updating user");
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield db_server_1.db.user.delete({ where: { id } });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error deleting user`);
    }
});
exports.deletePost = deletePost;
