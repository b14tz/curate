import { Router } from "express";
import {
    createPost,
    deletePost,
    getPost,
    updatePost,
} from "../controllers/post.controller";

const postRoutes = Router();

// public routes
postRoutes.get("/:id", getPost);

// authentication token goes here

// private routes
postRoutes.post("/", createPost);
postRoutes.post("/:id", updatePost);
postRoutes.delete("/:id", deletePost);

export default postRoutes;
