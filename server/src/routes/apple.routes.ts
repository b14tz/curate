import { Router } from "express";
import {
    fetchAllPlaylistsByMusicUserToken,
    fetchApplePlaylistById,
    fetchTopApplePlaylists,
    getAppleDeveloperToken,
} from "../controllers/apple.controller";

const appleRoutes = Router();

appleRoutes.get("/devtoken", getAppleDeveloperToken);
appleRoutes.get("/playlists", fetchAllPlaylistsByMusicUserToken);
appleRoutes.get("/playlists/top", fetchTopApplePlaylists);
appleRoutes.get("/playlist/:id", fetchApplePlaylistById);

export default appleRoutes;
