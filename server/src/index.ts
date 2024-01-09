// server/src/index.ts
import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";

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
app.use(passport.initialize());
app.use(passport.session());

// passport session setup
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
    user && done(null, user);
});

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// Check if Google API credentials are set
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.error("Google API credentials are missing!");
    process.exit(1); // Exit the application if credentials are not set
}

// Configure Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3300/api/auth/google/callback",
        },
        (accessToken, refreshToken, profile, cb) => {
            // Here you find or create a user in your database
            return cb(null, profile);
        }
    )
);

// Routes
app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect("/");
    }
);

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
