import { Router } from "express";
import {
    createLike,
    deleteLike,
    getAllPostLikes,
} from "../controllers/like.controller";

const likeRoutes = Router();

likeRoutes.get("/all/:id", getAllPostLikes);
likeRoutes.post("/", createLike);
likeRoutes.post("/remove", deleteLike);

export default likeRoutes;
