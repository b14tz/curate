import { Router } from "express";
import { googleAuth, googleAuthCallback } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.get("/google", googleAuth);
authRoutes.get("/google/callback", googleAuthCallback);

export default authRoutes;
