import { Router } from "express";
import {
    searchSpotify,
    populateSpotifyFeed,
} from "../controllers/spotify.controller";

const spotifyRoutes = Router();

// public routes
spotifyRoutes.post("/search", searchSpotify);
spotifyRoutes.get("/feed", populateSpotifyFeed);
// authentication token goes here

// private routes

export default spotifyRoutes;
