import { Router } from "express";
import {
    fetchAllPlaylistsByMusicUserToken,
    fetchTopApplePlaylists,
    getAppleDeveloperToken,
} from "../controllers/apple.controller";

const appleRoutes = Router();

appleRoutes.get("/devtoken", getAppleDeveloperToken);
appleRoutes.get("/playlists", fetchAllPlaylistsByMusicUserToken);
appleRoutes.get("/playlists/top", fetchTopApplePlaylists);

export default appleRoutes;
