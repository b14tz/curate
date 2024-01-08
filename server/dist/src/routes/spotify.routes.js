"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const spotify_controller_1 = require("../controllers/spotify.controller");
const spotifyRoutes = (0, express_1.Router)();
// public routes
spotifyRoutes.post("/search", spotify_controller_1.searchSpotify);
spotifyRoutes.get("/feed", spotify_controller_1.populateSpotifyFeed);
// authentication token goes here
// private routes
exports.default = spotifyRoutes;
