import { Request, Response } from "express";
import axios from "axios";

import { db } from "../utils/db.server";

export const generateClientToken = async (req: Request, res: Response) => {
    try {
        const key = await axios({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        process.env.SPOTIFY_CLIENT_ID +
                            ":" +
                            process.env.SPOTIFY_CLIENT_SECRET
                    ).toString("base64"),
            },
            data: "grant_type=client_credentials",
        });
        const token = key.data.access_token;
        return res
            .status(200)
            .send(`Successfully generated spotify client token: ${token}`);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error generating spotify client token`);
    }
};

export const createClientToken = async (req: Request, res: Response) => {
    const token = req.body;
    try {
        const result = await db.clientToken.create({
            data: { value: token },
        });
        return res
            .status(200)
            .send(
                `Successfully generated spotify client token at ${result.createdAt}`
            );
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(`Error adding spotify client token to the database`);
    }
};
