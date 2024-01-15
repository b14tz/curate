import { Router } from "express";
import {
    searchSpotify,
    populateSpotifyFeed,
    requestSpotifyAuthorization,
    requestAccessToken,
} from "../controllers/spotify.controller";

const spotifyRoutes = Router();

// public routes
spotifyRoutes.post("/search", searchSpotify);
spotifyRoutes.get("/feed", populateSpotifyFeed);

spotifyRoutes.get("/auth", requestSpotifyAuthorization);
spotifyRoutes.post("/token", requestAccessToken);
// authentication token goes here

// private routes

export default spotifyRoutes;
