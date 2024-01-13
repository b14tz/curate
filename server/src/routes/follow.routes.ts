import { Router } from "express";
import { followUser, unfollowUser } from "../controllers/follow.controller";

const followRoutes = Router();

followRoutes.post("/", followUser);
followRoutes.post("/remove", unfollowUser);

export default followRoutes;
