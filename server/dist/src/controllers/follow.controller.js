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
exports.deleteFollow = exports.createFollow = void 0;
const db_server_1 = require("../utils/db.server");
const createFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield db_server_1.db.follow.create({
            data: {
                followerId: data.followerId,
                followingId: data.followingId,
            },
        });
        res.status(200).json({ message: "Successfully followed user" });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createFollow = createFollow;
const deleteFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield db_server_1.db.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: data.followerId,
                    followingId: data.followingId,
                },
            },
        });
        res.status(200).json({ message: "Successfully unfollowed user" });
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteFollow = deleteFollow;
