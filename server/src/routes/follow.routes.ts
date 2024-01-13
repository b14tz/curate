import { Router } from "express";
import { createFollow, deleteFollow } from "../controllers/follow.controller";

const followRoutes = Router();

followRoutes.post("/", createFollow);
followRoutes.post("/remove", deleteFollow);

export default followRoutes;
