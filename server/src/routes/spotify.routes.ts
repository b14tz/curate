import { Router } from "express";
import { getClientToken } from "../controllers/spotify.controller";

const spotifyRoutes = Router();

// public routes
spotifyRoutes.get("/", getClientToken);

// authentication token goes here

// private routes

export default spotifyRoutes;
