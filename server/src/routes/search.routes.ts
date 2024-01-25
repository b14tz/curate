import { Router } from "express";
import { searchPosts, searchUsers } from "../controllers/search.controller";

const searchRoutes = Router();

searchRoutes.post("/posts", searchPosts);
searchRoutes.post("/users", searchUsers);

export default searchRoutes;
