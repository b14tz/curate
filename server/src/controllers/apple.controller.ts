import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import { Request, Response } from "express";

export const getAppleDeveloperToken = async (req: Request, res: Response) => {
    const {
        APPLE_MUSIC_TEAM_ID,
        APPLE_MUSIC_KEY_ID,
        APPLE_MUSIC_PRIVATE_KEY_PATH,
    } = process.env;

    if (
        !APPLE_MUSIC_TEAM_ID ||
        !APPLE_MUSIC_KEY_ID ||
        !APPLE_MUSIC_PRIVATE_KEY_PATH
    ) {
        throw new Error(
            "Apple Music environment variables are missing or invalid."
        );
    }

    try {
        const filePath = path.join(__dirname, APPLE_MUSIC_PRIVATE_KEY_PATH);
        const privateKey = await fs.readFile(filePath, "utf8");

        const token = jwt.sign({}, privateKey, {
            algorithm: "ES256",
            expiresIn: "180d",
            issuer: APPLE_MUSIC_TEAM_ID,
            header: {
                alg: "ES256",
                kid: APPLE_MUSIC_KEY_ID,
            },
        });

        return res.status(200).send(token);
    } catch (error) {
        console.error("Error generating Apple Developer token:", error);
        res.status(500).send(error);
    }
};

export const fetchApplePlaylistById = async (playlistId: string) => {
    return {};
};
