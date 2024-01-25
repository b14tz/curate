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
exports.fetchTopApplePlaylists = exports.fetchAllPlaylistsByMusicUserToken = exports.getAppleDeveloperToken = exports.getAppleDeveloperTokenCached = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
let cachedAppleDeveloperToken = null;
let tokenExpiry = null;
const getAppleDeveloperTokenCached = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedAppleDeveloperToken && tokenExpiry && new Date() < tokenExpiry) {
        return cachedAppleDeveloperToken;
    }
    else {
        const newToken = yield generateAppleDeveloperToken();
        cachedAppleDeveloperToken = newToken;
        // Set the tokenExpiry to the appropriate time based on your token's lifespan
        tokenExpiry = new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000); // 180 days from now
        return newToken;
    }
});
exports.getAppleDeveloperTokenCached = getAppleDeveloperTokenCached;
const generateAppleDeveloperToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const { APPLE_MUSIC_TEAM_ID, APPLE_MUSIC_KEY_ID, APPLE_MUSIC_PRIVATE_KEY_PATH, } = process.env;
    if (!APPLE_MUSIC_TEAM_ID ||
        !APPLE_MUSIC_KEY_ID ||
        !APPLE_MUSIC_PRIVATE_KEY_PATH) {
        throw new Error("Apple Music environment variables are missing or invalid.");
    }
    try {
        const filePath = path_1.default.join(__dirname, APPLE_MUSIC_PRIVATE_KEY_PATH);
        const privateKey = yield promises_1.default.readFile(filePath, "utf8");
        const token = jsonwebtoken_1.default.sign({}, privateKey, {
            algorithm: "ES256",
            expiresIn: "180d",
            issuer: APPLE_MUSIC_TEAM_ID,
            header: {
                alg: "ES256",
                kid: APPLE_MUSIC_KEY_ID,
            },
        });
        return token;
    }
    catch (error) {
        console.error("Error generating Apple Developer token:", error);
        return null;
    }
});
const getAppleDeveloperToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, exports.getAppleDeveloperTokenCached)();
        return res.status(200).send(token);
    }
    catch (error) {
        console.error("Error generating Apple Developer token:", error);
        res.status(500).send(error);
    }
});
exports.getAppleDeveloperToken = getAppleDeveloperToken;
const fetchAllPlaylistsByMusicUserToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const musicUserToken = req.header("Music-User-Token");
    if (!musicUserToken) {
        console.error("Music User Token is required");
        return res.status(400).send("Music User Token is required");
    }
    const appleDeveloperToken = yield (0, exports.getAppleDeveloperTokenCached)();
    if (!appleDeveloperToken) {
        throw new Error("Failed to retrieve Apple Developer Token");
    }
    try {
        const response = yield axios_1.default.get("https://api.music.apple.com/v1/me/library/playlists", {
            headers: {
                Authorization: `Bearer ${appleDeveloperToken}`,
                "Music-User-Token": musicUserToken,
            },
        });
        const transformedData = response.data.data
            .filter((playlist) => playlist.attributes.hasCatalog)
            .map((playlist) => ({
            id: playlist.attributes.playParams.globalId,
            name: playlist.attributes.name,
            description: playlist.attributes.description.standard,
        }));
        return res.json(transformedData);
    }
    catch (error) {
        console.error("Error fetching playlists:", error);
        return res.status(500).send("Failed to fetch playlists");
    }
});
exports.fetchAllPlaylistsByMusicUserToken = fetchAllPlaylistsByMusicUserToken;
const fetchTopApplePlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, exports.getAppleDeveloperTokenCached)();
        const playlistResults = yield (0, axios_1.default)({
            method: "get",
            url: `https://api.music.apple.com/v1/catalog/us/charts`,
            params: {
                limit: 20,
                types: "playlists", // Can be 'songs', 'albums', 'playlists', etc.
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("PLAYLISTSS: ", playlistResults.data.results.playlists[0].data[0].attributes);
        const playlists = playlistResults.data.results.playlists[0].data;
        const fetchPlaylistSongs = (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
            const songResults = yield (0, axios_1.default)({
                method: "get",
                url: `https://api.music.apple.com/v1/catalog/us/playlists/${playlistId}`,
                headers: { Authorization: `Bearer ${token}` },
            });
            //console.log("SONGRESULTS: ", songResults.data);
            return songResults.data.data[0].relationships.tracks.data.map((song) => ({
                id: song.id,
                title: song.attributes.name,
                artist: song.attributes.artistName,
                imageUrl: song.attributes.artwork.url
                    .replace("{w}", "600")
                    .replace("{h}", "600")
                    .replace("bb.jpg", "bb-60.jpg"),
            }));
        });
        const result = yield Promise.all(playlists.map((playlist) => __awaiter(void 0, void 0, void 0, function* () {
            const songs = yield fetchPlaylistSongs(playlist.attributes.playParams.id);
            return {
                id: playlist.id,
                title: playlist.attributes.name,
                origin: "apple",
                author: { displayName: "Apple" },
                description: playlist.attributes.description.short
                    ? playlist.attributes.description.short
                    : playlist.attributes.description.standard,
                songs: songs,
            };
        })));
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error searching with spotify client`);
    }
});
exports.fetchTopApplePlaylists = fetchTopApplePlaylists;
