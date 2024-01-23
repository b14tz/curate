import { Router } from "express";
import {
    createPost,
    deletePost,
    getFollowerPosts,
    getAllPosts,
    getUserPosts,
    getPost,
    updatePost,
} from "../controllers/post.controller";

const postRoutes = Router();

postRoutes.get("/", getAllPosts);
postRoutes.get("/:id", getPost);
postRoutes.get("/user/:id/followers", getFollowerPosts);
postRoutes.get("/user/:id", getUserPosts);

postRoutes.post("/", createPost);
postRoutes.post("/:id", updatePost);
postRoutes.delete("/:id", deletePost);

export default postRoutes;
