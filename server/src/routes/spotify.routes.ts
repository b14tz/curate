import { Router } from "express";
import {
    searchSpotify,
    populateSpotifyFeed,
    requestSpotifyAuthorization,
    requestAccessToken,
    fetchAllUserSpotifyPlaylists,
    fetchUserSpotifyID,
} from "../controllers/spotify.controller";

const spotifyRoutes = Router();

spotifyRoutes.post("/search", searchSpotify);
spotifyRoutes.get("/feed", populateSpotifyFeed);

spotifyRoutes.get("/auth", requestSpotifyAuthorization);
spotifyRoutes.post("/token", requestAccessToken);

spotifyRoutes.post("/id", fetchUserSpotifyID);
spotifyRoutes.post("/playlists", fetchAllUserSpotifyPlaylists);

export default spotifyRoutes;
