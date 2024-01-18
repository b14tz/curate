import { Router } from "express";
import {
    searchSpotify,
    populateSpotifyFeed,
    requestSpotifyAuthorization,
    requestAccessToken,
    fetchUserSpotifyID,
    fetchAllSpotifyPlaylistsByUserId,
    fetchPlaylistByIsrcs,
    fetchIsrcsByPlaylistId,
} from "../controllers/spotify.controller";

const spotifyRoutes = Router();

spotifyRoutes.post("/search", searchSpotify);
spotifyRoutes.get("/feed", populateSpotifyFeed);

spotifyRoutes.get("/auth", requestSpotifyAuthorization);
spotifyRoutes.post("/token", requestAccessToken);

spotifyRoutes.post("/id", fetchUserSpotifyID);
spotifyRoutes.post("/isrcs", fetchIsrcsByPlaylistId);
spotifyRoutes.post("/playlists", fetchAllSpotifyPlaylistsByUserId);
spotifyRoutes.post("/playlist", fetchPlaylistByIsrcs);

export default spotifyRoutes;
