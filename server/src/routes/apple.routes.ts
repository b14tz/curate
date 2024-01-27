import { Router } from "express";
import {
    getAppleDeveloperToken,
    getApplePlaylistById,
    getApplePlaylistsByUserToken,
    getTopApplePlaylists,
} from "../controllers/apple.controller";

const appleRoutes = Router();

appleRoutes.get("/devtoken", getAppleDeveloperToken);
appleRoutes.get("/playlists", getApplePlaylistsByUserToken);
appleRoutes.get("/playlists/top", getTopApplePlaylists);
appleRoutes.get("/playlist/:id", getApplePlaylistById);

export default appleRoutes;
