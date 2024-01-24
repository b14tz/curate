import { Router } from "express";
import { getAppleDeveloperToken } from "../controllers/apple.controller";

const appleRoutes = Router();

appleRoutes.get("/devtoken", getAppleDeveloperToken);

export default appleRoutes;
