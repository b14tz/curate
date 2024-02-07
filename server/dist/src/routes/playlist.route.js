"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const playlist_controller_1 = require("../controllers/playlist.controller");
const playlistRoutes = (0, express_1.Router)();
playlistRoutes.post("/save", playlist_controller_1.savePlaylist);
exports.default = playlistRoutes;
