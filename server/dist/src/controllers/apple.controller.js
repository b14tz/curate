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
exports.fetchApplePlaylistById = exports.getAppleDeveloperToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const getAppleDeveloperToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        return res.status(200).send(token);
    }
    catch (error) {
        console.error("Error generating Apple Developer token:", error);
        res.status(500).send(error);
    }
});
exports.getAppleDeveloperToken = getAppleDeveloperToken;
const fetchApplePlaylistById = (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
exports.fetchApplePlaylistById = fetchApplePlaylistById;
