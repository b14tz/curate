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
exports.googleAuthCallback = exports.googleAuth = void 0;
const googleapis_1 = require("googleapis");
const jsonwebtoken_1 = require("jsonwebtoken");
const crypto_1 = require("crypto");
const generateJWTSecret = () => {
    // Generate a random 256-bit (32-byte) secret key
    const secret = (0, crypto_1.randomBytes)(32).toString("base64");
    return secret;
};
const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, // Client ID
process.env.GOOGLE_CLIENT_SECRET, // Client Secret
process.env.GOOGLE_REDIRECT_URL // Redirect URL
);
const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
];
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });
    res.redirect(url);
});
exports.googleAuth = googleAuth;
const googleAuthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    const { tokens } = yield oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // For example, retrieve the user's profile information
    const oauth2 = googleapis_1.google.oauth2({
        auth: oauth2Client,
        version: "v2",
    });
    const userInfo = yield oauth2.userinfo.get();
    const token = (0, jsonwebtoken_1.sign)({ user: userInfo }, process.env.JWT_SECRET || generateJWTSecret());
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
});
exports.googleAuthCallback = googleAuthCallback;
