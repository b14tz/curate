import axios from "axios";
import { Request, Response } from "express";

import { getClientToken } from "../utils/spotify-client-token";

export const searchSpotify = async (req: Request, res: Response) => {
    const search = req.body;
    const type = encodeURIComponent(search.types.join());
    try {
        const token = await getClientToken();
        const searchResults = await axios({
            method: "get",
            url: `https://api.spotify.com/v1/search?q=${search.term}&type=${type}&limit=${search.limit}&offset=${search.offset}`,
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = searchResults.data;

        // console.log(data.tracks.items[0]);
        // console.log(data.albums.items[0]);
        //console.log(data.artists.items[1]);

        let result: any = {};
        for (const itemType in data) {
            const items = data[itemType].items;
            result[itemType] = [];
            for (const item of items) {
                if (itemType === "albums") {
                    result[itemType].push({
                        type: itemType,
                        uri: item.uri,
                        title: item.name,
                        name: item.artists[0].name,
                        imageUrl: item.images[0].url,
                        releaseDate: item.release_date,
                    });
                }
                if (itemType === "tracks") {
                    result[itemType].push({
                        type: itemType,
                        uri: item.uri,
                        title: item.name,
                        name: item.artists[0].name,
                        imageUrl: item.album.images[0].url,
                        releaseDate: item.release_date,
                    });
                }
                if (itemType === "artists") {
                    result[itemType].push({
                        type: itemType,
                        uri: item.uri,
                        title: null,
                        name: item.name,
                        imageUrl: item.images[0] ? item.images[0].url : "",
                        releaseDate: null,
                    });
                }
            }
        }
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error searching with spotify client`);
    }
};
