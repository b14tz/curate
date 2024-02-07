import { Request, Response } from "express";
import {
    createSpotifyPlaylist,
    getIsrcsBySpotifyPlaylistId,
    getTrackUrisByIsrcs,
    getTrackUrisBySpotifyPlaylistId,
} from "./spotify.controller";
import {
    createApplePlaylist,
    getIsrcsByApplePlaylistId,
    getSongIdsByApplePlaylistId,
    getSongIdsByIsrcs,
} from "./apple.controller";

export const savePlaylist = async (req: Request, res: Response) => {
    const {
        title,
        description,
        origin,
        originId,
        destination,
        destinationUserToken,
    } = req.body;
    try {
        let dataForDestination: any;

        if (origin === "spotify" && destination === "spotify") {
            // Spotify to Spotify
            const trackUris = await getTrackUrisBySpotifyPlaylistId(originId);
            dataForDestination = {
                title,
                description,
                ids: trackUris,
                accessToken: destinationUserToken,
            };
        } else if (origin === "spotify" && destination === "apple") {
            // Spotify to Apple
            const isrcs = await getIsrcsBySpotifyPlaylistId(originId);
            const appleTrackUris = await getSongIdsByIsrcs(isrcs);
            dataForDestination = {
                title,
                description,
                ids: appleTrackUris,
                musicUserToken: destinationUserToken,
            };
        } else if (origin === "apple" && destination === "apple") {
            // Apple to Apple
            const songIds = await getSongIdsByApplePlaylistId(originId);
            dataForDestination = {
                title,
                description,
                ids: songIds,
                musicUserToken: destinationUserToken,
            };
        } else if (origin === "apple" && destination === "spotify") {
            // Apple to Spotify
            const isrcs = await getIsrcsByApplePlaylistId(originId);
            const trackUris = await getTrackUrisByIsrcs(isrcs);
            dataForDestination = {
                title,
                description,
                ids: trackUris,
                accessToken: destinationUserToken,
            };
        }

        if (destinationUserToken) {
            if (destination === "spotify") {
                await createSpotifyPlaylist(dataForDestination);
            } else if (destination === "apple") {
                await createApplePlaylist(dataForDestination);
            }
        }

        return res.status(200).send("Successfully saved playlist");
    } catch (error) {
        console.error("Error in saving playlist:", error);
        return res.status(500).send("Error in saving playlist");
    }
};
