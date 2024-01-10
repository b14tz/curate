"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// server/src/index.ts
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const googleapis_1 = require("googleapis");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const spotify_routes_1 = __importDefault(require("./routes/spotify.routes"));
const webhook_routes_1 = __importDefault(require("./routes/webhook.routes"));
dotenv.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://cureight.vercel.app",
        "https://curate-api.vercel.app",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};
// middleware
app.use(express_1.default.json({ limit: "200mb" }));
app.use(express_1.default.urlencoded({ limit: "200mb", extended: true }));
app.use((0, cors_1.default)(corsOptions));
// session
app.use((0, express_session_1.default)({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
}));
// google auth
const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, // Client ID
process.env.GOOGLE_CLIENT_SECRET, // Client Secret
process.env.GOOGLE_REDIRECT_URL // Redirect URL
);
const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
];
app.get("/api/auth/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });
    res.redirect(url);
});
app.get("/api/auth/google/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    const { tokens } = yield oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // Now you can use oauth2Client for authenticated requests or store the tokens
    // For example, retrieve the user's profile information
    const oauth2 = googleapis_1.google.oauth2({
        auth: oauth2Client,
        version: "v2",
    });
    const userInfo = yield oauth2.userinfo.get();
    // Handle the user info (store in database, create session, etc.)
    res.send(userInfo.data);
}));
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
// api routes
app.use("/api/user", user_routes_1.default);
app.use("/api/post", post_routes_1.default);
app.use("/api/spotify", spotify_routes_1.default);
app.use("/api/webhook", webhook_routes_1.default);
//app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
