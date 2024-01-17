import axios from "axios";
import { Request, Response } from "express";

import { getClientToken } from "../utils/spotify-client-token";
import { randomBytes } from "crypto";

export const requestSpotifyAuthorization = async (
    req: Request,
    res: Response
) => {
    // const state = randomBytes(16).toString("base64");
    const scope =
        "user-read-private playlist-read-private playlist-read-collaborative";

    const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REDIRECT_URI) {
        return res.status(500).send("Server configuration error");
    }

    res.redirect(
        "https://accounts.spotify.com/authorize?" +
            `response_type=code` +
            `&client_id=${encodeURIComponent(SPOTIFY_CLIENT_ID)}` +
            `&scope=${encodeURIComponent(scope)}` +
            `&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`
    );
};

export const requestAccessToken = async (req: Request, res: Response) => {
    try {
        const code = req.body.code;

        const {
            SPOTIFY_CLIENT_ID,
            SPOTIFY_CLIENT_SECRET,
            SPOTIFY_REDIRECT_URI,
        } = process.env;
        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
            return res.status(500).send("Server configuration error");
        }

        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                        "Basic " +
                        Buffer.from(
                            SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
                        ).toString("base64"),
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error retrieving access token");
    }
};

export const fetchUserSpotifyID = async (req: Request, res: Response) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).send("No token provided");
        }
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        res.send(data.id);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving Spotify ID");
    }
};

export const fetchAllUserSpotifyPlaylists = async (
    req: Request,
    res: Response
) => {
    try {
        const { token, spotifyId } = req.body;
        if (!token || !spotifyId) {
            return res.status(400).send("Token or Spotify ID missing");
        }
        const { data } = await axios.get(
            "https://api.spotify.com/v1/me/playlists",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    limit: 50,
                },
            }
        );
        //only return playlists where current user is the author
        let authoredPlaylists = [];
        for (let i = 0; i < data.items.length; i++) {
            if (data.items[i]["owner"]["id"] === spotifyId) {
                authoredPlaylists.push(data.items[i]);
            }
        }
        res.send(authoredPlaylists);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user's Spotify playlists");
    }
};

export const populateSpotifyFeed = async (req: Request, res: Response) => {
    try {
        const token = await getClientToken();
        const playlistResults = await axios({
            method: "get",
            url: `https://api.spotify.com/v1/browse/featured-playlists?country=US`,
            headers: { Authorization: `Bearer ${token}` },
        });
        const playlists = playlistResults.data.playlists.items;

        const result = await Promise.all(
            playlists.map(async (playlist: any) => {
                const songs = await fetchPlaylistSongs(
                    token,
                    playlist.tracks.href
                );

                return {
                    id: playlist.id,
                    title: playlist.name,
                    author: playlist.owner.display_name,
                    description: playlist.description.replace(/Cover:.*$/, ""),
                    songs: songs,
                    downloads: 0,
                    likes: [],
                    comments: [],
                };
            })
        );

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error searching with spotify client`);
    }
};

export const fetchPlaylistSongs = async (token: string, url: string) => {
    const songResults = await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${token}` },
    });

    return songResults.data.items.map((song: any) => ({
        id: song.track?.id,
        title: song.track?.name,
        artist: song.track?.artists[0].name,
        imageUrl: song.track?.album.images[0]?.url,
    }));
};

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
        // console.log(data.artists.items[1]);

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
        console.error(error);
        return res.status(500).send(`Error searching with spotify client`);
    }
};
