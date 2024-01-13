import { Router } from "express";
import {
    createPost,
    deletePost,
    getAllFollowerPosts,
    getAllPosts,
    getPost,
    updatePost,
} from "../controllers/post.controller";

const postRoutes = Router();

// public routes
postRoutes.get("/:id", getPost);
postRoutes.get("/feed/all", getAllPosts);
postRoutes.get("/feed/:id", getAllFollowerPosts);

// authentication token goes here

// private routes
postRoutes.post("/", createPost);
postRoutes.post("/:id", updatePost);
postRoutes.delete("/:id", deletePost);

export default postRoutes;
