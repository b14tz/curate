"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePlaylist = void 0;
const spotify_controller_1 = require("./spotify.controller");
const apple_controller_1 = require("./apple.controller");
const savePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, origin, originId, destination, destinationUserToken, } = req.body;
    try {
        let dataForDestination;
        if (origin === "spotify" && destination === "spotify") {
            // Spotify to Spotify
            const trackUris = yield (0, spotify_controller_1.getTrackUrisBySpotifyPlaylistId)(originId);
            dataForDestination = {
                title,
                description,
                ids: trackUris,
                accessToken: destinationUserToken,
            };
        }
        else if (origin === "spotify" && destination === "apple") {
            // Spotify to Apple
            const isrcs = yield (0, spotify_controller_1.getIsrcsBySpotifyPlaylistId)(originId);
            const appleTrackUris = yield (0, apple_controller_1.getSongIdsByIsrcs)(isrcs);
            dataForDestination = {
                title,
                description,
                ids: appleTrackUris,
                musicUserToken: destinationUserToken,
            };
        }
        else if (origin === "apple" && destination === "apple") {
            // Apple to Apple
            const songIds = yield (0, apple_controller_1.getSongIdsByApplePlaylistId)(originId);
            dataForDestination = {
                title,
                description,
                ids: songIds,
                musicUserToken: destinationUserToken,
            };
        }
        else if (origin === "apple" && destination === "spotify") {
            // Apple to Spotify
            const isrcs = yield (0, apple_controller_1.getIsrcsByApplePlaylistId)(originId);
            const trackUris = yield (0, spotify_controller_1.getTrackUrisByIsrcs)(isrcs);
            dataForDestination = {
                title,
                description,
                ids: trackUris,
                accessToken: destinationUserToken,
            };
        }
        if (destinationUserToken) {
            if (destination === "spotify") {
                yield (0, spotify_controller_1.createSpotifyPlaylist)(dataForDestination);
            }
            else if (destination === "apple") {
                yield (0, apple_controller_1.createApplePlaylist)(dataForDestination);
            }
        }
        return res.status(200).send("Successfully saved playlist");
    }
    catch (error) {
        console.error("Error in saving playlist:", error);
        return res.status(500).send("Error in saving playlist");
    }
});
exports.savePlaylist = savePlaylist;
