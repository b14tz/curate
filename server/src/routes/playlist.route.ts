import { Router } from "express";
import { savePlaylist } from "../controllers/playlist.controller";

const playlistRoutes = Router();

playlistRoutes.post("/save", savePlaylist);

export default playlistRoutes;
