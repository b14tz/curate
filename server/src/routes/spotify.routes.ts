import { Router } from "express";
import {
    searchSpotify,
    requestSpotifyAuthorization,
    requestAccessToken,
    fetchUserSpotifyID,
    fetchAllPlaylistsByUserId,
    fetchSpotifyPlaylistById,
    fetchTopSpotifyPlaylists,
} from "../controllers/spotify.controller";

const spotifyRoutes = Router();

spotifyRoutes.get("/auth", requestSpotifyAuthorization);
spotifyRoutes.post("/token", requestAccessToken);

spotifyRoutes.post("/id", fetchUserSpotifyID);

spotifyRoutes.get("/playlist/:id", fetchSpotifyPlaylistById);
spotifyRoutes.get("/playlists/top", fetchTopSpotifyPlaylists);
spotifyRoutes.post("/playlists/user/:id", fetchAllPlaylistsByUserId);

spotifyRoutes.post("/search", searchSpotify);

export default spotifyRoutes;
