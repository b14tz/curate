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
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const spotify_routes_1 = __importDefault(require("./routes/spotify.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const follow_routes_1 = __importDefault(require("./routes/follow.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const apple_routes_1 = __importDefault(require("./routes/apple.routes"));
dotenv.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://cureight.vercel.app",
        "https://curate-api.vercel.app",
    ],
    credentials: true,
};
// middleware
app.use(express_1.default.json({ limit: "200mb" }));
app.use(express_1.default.urlencoded({ limit: "200mb", extended: true }));
app.use((0, cors_1.default)(corsOptions));
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
// api routes
app.use("/api/user", user_routes_1.default);
app.use("/api/post", post_routes_1.default);
app.use("/api/spotify", spotify_routes_1.default);
app.use("/api/apple", apple_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/follow", follow_routes_1.default);
app.use("/api/comment", comment_routes_1.default);
app.use("/api/like", like_routes_1.default);
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
