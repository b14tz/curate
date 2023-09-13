import { Router } from "express";
import { searchSpotify } from "../controllers/spotify.controller";

const spotifyRoutes = Router();

// public routes
spotifyRoutes.post("/search", searchSpotify);

// authentication token goes here

// private routes

export default spotifyRoutes;
