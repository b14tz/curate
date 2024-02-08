import { Router } from "express";
import {
    createComment,
    deleteComment,
    getAllPostComments,
} from "../controllers/comment.controller";

const commentRoutes = Router();

commentRoutes.get("/all/:id", getAllPostComments);
commentRoutes.post("/", createComment);
commentRoutes.delete("/:id", deleteComment);

export default commentRoutes;
