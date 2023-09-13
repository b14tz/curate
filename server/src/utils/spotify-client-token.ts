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
                console.log(`Updated spotify client token`);
                return newToken;
            }
            // if token exists and timestamp is not expired: return token
            console.log(`Retrieved spotify client token`);
            return token.value;
        } else {
            // if no token exists: generate new token, create db entry, and return token
            let newToken = await generateClientToken();
            await createClientToken(newToken);
            console.log(`Created spotify client token`);
            return newToken;
        }
    } catch (error) {
        console.log(error);
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
        console.log(
            `Successfully generated spotify client token: ${key.data.access_token}`
        );
        return key.data.access_token;
    } catch (error) {
        console.log(error);
    }
};

const createClientToken = async (token: string) => {
    try {
        const result = await db.clientToken.create({
            data: { value: token },
        });
        console.log(`Successfully added client token to the database `);
    } catch (error) {
        console.log(error);
    }
};

const updateClientToken = async (token: string) => {
    try {
        const result = await db.clientToken.update({
            data: { value: token, createdAt: new Date() },
            where: { id: 1 },
        });
        console.log(`Successfully updated client token in the database`);
    } catch (error) {
        console.log(error);
    }
};
