// server/src/index.ts
import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import spotifyRoutes from "./routes/spotify.routes";
import authRoutes from "./routes/auth.routes";
import followRoutes from "./routes/follow.routes";

dotenv.config();

const app: Application = express();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://cureight.vercel.app",
        "https://curate-api.vercel.app",
    ],
    credentials: true,
};

// middleware
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors(corsOptions));

app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});

// api routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/follow", followRoutes);

const PORT = process.env.PORT || 3300;
app.listen(PORT, (): void => {
    console.log(`Server listening on port ${PORT}`);
});
