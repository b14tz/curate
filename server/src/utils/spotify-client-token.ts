import axios from "axios";

import { db } from "./db.server";

export const getClientToken = async () => {
    try {
        let token = await db.clientToken.findFirst();
        if (token) {
            const now = new Date();
            const tokenAge = now.getTime() - token.createdAt.getTime();
            const hour = 60 * 60 * 1000; // one hour in milliseconds
            if (tokenAge > hour) {
                // if token exists in db and timestamp is expired: generate new token, update db entry, and return token
                let newToken = await generateClientToken();
                await updateClientToken(newToken);
                return newToken;
            }
            // if token exists and timestamp is not expired: return token
            return token.value;
        } else {
            // if no token exists: generate new token, create db entry, and return token
            let newToken = await generateClientToken();
            await createClientToken(newToken);
            return newToken;
        }
    } catch (error) {
        console.error(error);
    }
};

const generateClientToken = async () => {
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
        return key.data.access_token;
    } catch (error) {
        console.error(error);
    }
};

const createClientToken = async (token: string) => {
    try {
        const result = await db.clientToken.create({
            data: { value: token },
        });
    } catch (error) {
        console.error(error);
    }
};

const updateClientToken = async (token: string) => {
    try {
        const clientToken = await db.clientToken.findFirst();
        if (clientToken) {
            const result = await db.clientToken.update({
                data: { value: token, createdAt: new Date() },
                where: { id: clientToken.id },
            });
        }
    } catch (error) {
        console.error(error);
    }
};
