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
        //console.log(data.tracks.items[0].album.images[0].url);
        const result = [];
        for (const itemType in data) {
            const items = data[itemType].items;
            for (const item of items) {
                result.push({
                    type: itemType,
                    uri: item.uri,
                    name: item.name,
                    imageUrl:
                        itemType === "albums"
                            ? item.images[0].url
                            : itemType === "tracks"
                            ? item.album.images[0].url
                            : null,
                });
            }
        }

        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error searching with spotify client`);
    }
};
