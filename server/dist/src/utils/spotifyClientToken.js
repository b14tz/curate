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
exports.getClientToken = void 0;
const axios_1 = __importDefault(require("axios"));
const db_server_1 = require("./db.server");
const getClientToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = yield db_server_1.db.clientToken.findFirst();
        if (token) {
            const now = new Date();
            const tokenAge = now.getTime() - token.createdAt.getTime();
            const hour = 60 * 60 * 1000; // one hour in milliseconds
            if (tokenAge > hour) {
                // if token exists in db and timestamp is expired: generate new token, update db entry, and return token
                let newToken = yield generateClientToken();
                yield updateClientToken(newToken);
                return newToken;
            }
            // if token exists and timestamp is not expired: return token
            return token.value;
        }
        else {
            // if no token exists: generate new token, create db entry, and return token
            let newToken = yield generateClientToken();
            yield createClientToken(newToken);
            return newToken;
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.getClientToken = getClientToken;
const generateClientToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = yield (0, axios_1.default)({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            headers: {
                Authorization: "Basic " +
                    Buffer.from(process.env.SPOTIFY_CLIENT_ID +
                        ":" +
                        process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
            },
            data: "grant_type=client_credentials",
        });
        return key.data.access_token;
    }
    catch (error) {
        console.error(error);
    }
});
const createClientToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_server_1.db.clientToken.create({
            data: { value: token },
        });
    }
    catch (error) {
        console.error(error);
    }
});
const updateClientToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientToken = yield db_server_1.db.clientToken.findFirst();
        if (clientToken) {
            const result = yield db_server_1.db.clientToken.update({
                data: { value: token, createdAt: new Date() },
                where: { id: clientToken.id },
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
