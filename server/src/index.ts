import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import spotifyRoutes from "./routes/spotify.routes";
import webhookRoutes from "./routes/webhook.routes";

dotenv.config();

const app: Application = express();
const corsOptions = { origin: ["http://localhost:5173"] };

// middleware
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors(corsOptions));

// api routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/webhook", webhookRoutes);

const PORT = process.env.PORT || 3300;
app.listen(PORT, (): void => {
    console.log(`Server listening on port ${PORT}`);
});
