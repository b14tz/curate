import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";

dotenv.config();

const app: Application = express();
const corsOptions = { origin: ["http://localhost:5173"] };

// middleware
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors(corsOptions));

// api routes
app.use("/api/user");
app.use("/api/post");
app.use("/api/follow");

const PORT = process.env.PORT || 3300;
app.listen(PORT, (): void => {
    console.log(`Server listening on port ${PORT}`);
});
