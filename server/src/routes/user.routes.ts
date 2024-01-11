import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    updateUser,
} from "../controllers/user.controller";

const userRoutes = Router();

// public routes
userRoutes.get("/:id", getUser);

// authentication token goes here

// private routes
userRoutes.post("/", createUser);
userRoutes.post("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
// this is a test comment
