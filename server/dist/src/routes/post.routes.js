"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const postRoutes = (0, express_1.Router)();
// public routes
postRoutes.get("/:id", post_controller_1.getPost);
postRoutes.get("/feed/all", post_controller_1.getAllPosts);
postRoutes.get("/feed/:id", post_controller_1.getAllFollowerPosts);
// authentication token goes here
// private routes
postRoutes.post("/", post_controller_1.createPost);
postRoutes.post("/:id", post_controller_1.updatePost);
postRoutes.delete("/:id", post_controller_1.deletePost);
exports.default = postRoutes;
