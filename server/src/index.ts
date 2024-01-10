// server/src/index.ts
import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import { google } from "googleapis";

import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import spotifyRoutes from "./routes/spotify.routes";
import webhookRoutes from "./routes/webhook.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app: Application = express();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://cureight.vercel.app",
        "https://curate-api.vercel.app",
    ],
    credentials: true, // allows cookies to be sent with requests
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

// middleware
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors(corsOptions));

// session
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
    })
);

// google auth
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, // Client ID
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

app.get("/api/auth/google/callback", async (req, res) => {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Now you can use oauth2Client for authenticated requests or store the tokens
    // For example, retrieve the user's profile information
    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();
    // Handle the user info (store in database, create session, etc.)

    res.send(userInfo.data);
});

app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});

// api routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/webhook", webhookRoutes);
//app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3300;
app.listen(PORT, (): void => {
    console.log(`Server listening on port ${PORT}`);
});
