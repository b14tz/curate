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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/index.ts
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const express_session_1 = __importDefault(require("express-session"));
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
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// passport session setup
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((user, done) => {
    user && done(null, user);
});
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
// Check if Google API credentials are set
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.error("Google API credentials are missing!");
    process.exit(1); // Exit the application if credentials are not set
}
// Configure Google Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3300/api/auth/google/callback",
}, (accessToken, refreshToken, profile, cb) => {
    // Here you find or create a user in your database
    return cb(null, profile);
}));
// Routes
app.get("/api/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
app.get("/api/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
});
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
