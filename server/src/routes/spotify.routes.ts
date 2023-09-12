import { Router } from "express";
import { generateClientToken } from "../controllers/spotify.controller";

const spotifyRoutes = Router();

// public routes

// authentication token goes here

// private routes
spotifyRoutes.post("/", generateClientToken);

export default spotifyRoutes;
