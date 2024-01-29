"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const postRoutes = (0, express_1.Router)();
postRoutes.get("/", post_controller_1.getAllPosts);
postRoutes.get("/:id", post_controller_1.getPost);
postRoutes.get("/user/:id/followers", post_controller_1.getFollowerPosts);
postRoutes.get("/user/:id", post_controller_1.getUserPosts);
postRoutes.post("/", post_controller_1.createPost);
postRoutes.post("/:id", post_controller_1.updatePost);
postRoutes.post("/:id/save", post_controller_1.savePost);
postRoutes.delete("/:id", post_controller_1.deletePost);
exports.default = postRoutes;
