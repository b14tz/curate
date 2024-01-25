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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSpotify = exports.fetchSpotifyPlaylistById = exports.fetchTopSpotifyPlaylists = exports.fetchAllPlaylistsByUserId = exports.fetchUserSpotifyID = exports.refreshAccessToken = exports.requestAccessToken = exports.requestSpotifyAuthorization = void 0;
const axios_1 = __importDefault(require("axios"));
const spotifyClientToken_1 = require("../utils/spotifyClientToken");
const requestSpotifyAuthorization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const state = randomBytes(16).toString("base64");
    const scope = "user-read-private playlist-read-private playlist-read-collaborative";
    const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REDIRECT_URI) {
        return res.status(500).send("Server configuration error");
    }
    res.redirect("https://accounts.spotify.com/authorize?" +
        `response_type=code` +
        `&client_id=${encodeURIComponent(SPOTIFY_CLIENT_ID)}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}` +
        `&show_dialog=true`);
});
exports.requestSpotifyAuthorization = requestSpotifyAuthorization;
const requestAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.body.code;
        const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI, } = process.env;
        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
            return res.status(500).send("Server configuration error");
        }
        const response = yield axios_1.default.post("https://accounts.spotify.com/api/token", {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " +
                    Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64"),
            },
        });
        return res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Error retrieving access token");
    }
});
exports.requestAccessToken = requestAccessToken;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
            return res.status(500).send("Server configuration error");
        }
        const response = yield axios_1.default.post("https://accounts.spotify.com/api/token", {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " +
                    Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64"),
            },
        });
        return res.status(200).send(response.data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error refreshing access token");
    }
});
exports.refreshAccessToken = refreshAccessToken;
const fetchUserSpotifyID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).send("No token provided");
        }
        const { data } = yield axios_1.default.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.send(data.id);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error retrieving Spotify ID");
    }
});
exports.fetchUserSpotifyID = fetchUserSpotifyID;
const fetchAllPlaylistsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spotifyId = req.params.id;
        const { token } = req.body;
        if (!token || !spotifyId) {
            return res.status(400).send("Token or Spotify ID missing");
        }
        const { data } = yield axios_1.default.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                limit: 50,
            },
        });
        let authoredPlaylists = [];
        for (let i = 0; i < data.items.length; i++) {
            if (data.items[i]["owner"]["id"] === spotifyId) {
                authoredPlaylists.push(data.items[i]);
            }
        }
        return res.status(200).send(authoredPlaylists);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .send("Error retrieving user's Spotify playlists");
    }
});
exports.fetchAllPlaylistsByUserId = fetchAllPlaylistsByUserId;
const fetchTopSpotifyPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, spotifyClientToken_1.getClientToken)();
        const topPlaylistsData = yield (0, axios_1.default)({
            method: "get",
            url: `https://api.spotify.com/v1/browse/featured-playlists?country=US`,
            headers: { Authorization: `Bearer ${token}` },
        });
        const playlists = topPlaylistsData.data.playlists.items;
        const fetchPlaylistData = (token, url) => __awaiter(void 0, void 0, void 0, function* () {
            const playlistResults = yield (0, axios_1.default)({
                method: "get",
                url: url,
                headers: { Authorization: `Bearer ${token}` },
            });
            return {
                songs: playlistResults.data.items.map((song) => {
                    var _a, _b, _c, _d, _e;
                    return ({
                        id: (_a = song.track) === null || _a === void 0 ? void 0 : _a.id,
                        title: (_b = song.track) === null || _b === void 0 ? void 0 : _b.name,
                        artist: (_c = song.track) === null || _c === void 0 ? void 0 : _c.artists[0].name,
                        imageUrl: (_e = (_d = song.track) === null || _d === void 0 ? void 0 : _d.album.images[0]) === null || _e === void 0 ? void 0 : _e.url,
                    });
                }),
                total: playlistResults.data.total,
                next: playlistResults.data.next,
            };
        });
        const result = yield Promise.all(playlists.map((playlist) => __awaiter(void 0, void 0, void 0, function* () {
            const songData = yield fetchPlaylistData(token, playlist.tracks.href);
            return {
                id: playlist.id,
                title: playlist.name,
                origin: "spotify",
                author: { displayName: "Spotify" },
                description: playlist.description.replace(/Cover:.*$/, ""),
                songs: songData.songs,
                total: songData.total,
                next: songData.next,
            };
        })));
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error searching with spotify client`);
    }
});
exports.fetchTopSpotifyPlaylists = fetchTopSpotifyPlaylists;
const fetchSpotifyPlaylistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlistId = req.params.id;
        const token = yield (0, spotifyClientToken_1.getClientToken)();
        const playlistData = yield (0, axios_1.default)({
            method: "get",
            url: `https://api.spotify.com/v1/playlists/${playlistId}`,
            headers: { Authorization: `Bearer ${token}` },
        });
        const songs = playlistData.data.tracks.items.map((song) => {
            var _a, _b, _c, _d, _e;
            return ({
                id: (_a = song.track) === null || _a === void 0 ? void 0 : _a.id,
                title: (_b = song.track) === null || _b === void 0 ? void 0 : _b.name,
                artist: (_c = song.track) === null || _c === void 0 ? void 0 : _c.artists[0].name,
                imageUrl: (_e = (_d = song.track) === null || _d === void 0 ? void 0 : _d.album.images[0]) === null || _e === void 0 ? void 0 : _e.url,
            });
        });
        return res.send({
            id: playlistData.data.id,
            title: playlistData.data.name,
            description: playlistData.data.description,
            songs: songs,
            origin: "Spotify",
            author: { displayName: "Spotify" },
            next: playlistData.data.tracks.next,
            total: playlistData.data.tracks.total,
        });
    }
    catch (error) {
        console.error("Error fetch spotify playlist by id", error);
    }
});
exports.fetchSpotifyPlaylistById = fetchSpotifyPlaylistById;
const searchSpotify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.body;
    const type = encodeURIComponent(search.types.join());
    try {
        const token = yield (0, spotifyClientToken_1.getClientToken)();
        const searchResults = yield (0, axios_1.default)({
            method: "get",
            url: `https://api.spotify.com/v1/search?q=${search.term}&type=${type}&limit=${search.limit}&offset=${search.offset}`,
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = searchResults.data;
        let result = {};
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error searching with spotify client`);
    }
});
exports.searchSpotify = searchSpotify;
// interface TrackWithoutISRC {
//     name: string;
//     artist: string;
// }
// interface SpotifyTrackItem {
//     track: {
//         name: string;
//         artists: { name: string }[];
//         external_ids: { isrc?: string };
//     };
// }
// export const fetchIsrcsByPlaylistId = async (req: Request, res: Response) => {
//     const { playlistId, token } = req.body;
//     if (!playlistId || !token) {
//         return res
//             .status(400)
//             .send({ message: "Playlist ID and token are required" });
//     }
//     let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
//     let tracksWithISRC: string[] = [];
//     let tracksWithoutISRC: TrackWithoutISRC[] = [];
//     let getNext = true;
//     try {
//         while (getNext) {
//             const response = await axios.get(url, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             response.data.items.forEach((item: SpotifyTrackItem) => {
//                 if (
//                     item.track &&
//                     item.track.external_ids &&
//                     item.track.external_ids.isrc
//                 ) {
//                     tracksWithISRC.push(item.track.external_ids.isrc);
//                 } else if (item.track) {
//                     tracksWithoutISRC.push({
//                         name: item.track.name,
//                         artist: item.track.artists
//                             .map((artist) => artist.name)
//                             .join(", "),
//                     });
//                 }
//             });
//             if (response.data.next !== null) {
//                 url = response.data.next;
//             } else {
//                 getNext = false;
//             }
//         }
//         return res.status(200).send(tracksWithISRC.join(","));
//     } catch (error) {
//         console.error("Error fetching Spotify playlist:", error);
//         return res.status(500).send({ message: "Internal Server Error" });
//     }
// };
// export const fetchPlaylistByIsrcs = async (isrcs: string) => {
//     const token = await getClientToken();
//     const isrcList = isrcs.split(",");
//     if (!token || !isrcList || !Array.isArray(isrcList)) {
//         console.error(
//             "Invalid request data. Please provide a token and an array of ISRCs."
//         );
//         return [];
//     }
//     try {
//         const tracks = await Promise.all(
//             isrcList.map(
//                 (isrc) =>
//                     axios
//                         .get(
//                             `https://api.spotify.com/v1/search?type=track&q=isrc:${isrc}`,
//                             {
//                                 headers: { Authorization: `Bearer ${token}` },
//                             }
//                         )
//                         .then((response) => {
//                             const track = response.data.tracks.items[0];
//                             if (track) {
//                                 return {
//                                     title: track.name,
//                                     artist: track.artists
//                                         .map((artist: any) => artist.name)
//                                         .join(", "),
//                                     imageUrl: track.album.images[0]?.url,
//                                 };
//                             }
//                             return null;
//                         })
//                         .catch(() => null) // In case of an error, return null for this track
//             )
//         );
//         return tracks.filter((track) => track !== null);
//     } catch (error) {
//         console.error("Error fetching tracks by ISRC:", error);
//         return [];
//     }
// };
