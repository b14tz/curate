"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const like_controller_1 = require("../controllers/like.controller");
const likeRoutes = (0, express_1.Router)();
likeRoutes.get("/all/:id", like_controller_1.getAllPostLikes);
likeRoutes.post("/:id", like_controller_1.createLike);
likeRoutes.post("/remove/:id", like_controller_1.deleteLike);
exports.default = likeRoutes;
