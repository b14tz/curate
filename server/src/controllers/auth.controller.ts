import { Request, Response } from "express";
import { google } from "googleapis";
import { sign } from "jsonwebtoken";
import { randomBytes } from "crypto";

const generateJWTSecret = () => {
    // Generate a random 256-bit (32-byte) secret key
    const secret = randomBytes(32).toString("base64");
    return secret;
};

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, // Client ID
    process.env.GOOGLE_CLIENT_SECRET, // Client Secret
    process.env.GOOGLE_REDIRECT_URL // Redirect URL
);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
];

export const googleAuth = async (req: Request, res: Response) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });
    res.redirect(url);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // For example, retrieve the user's profile information
    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();
    const token = sign(
        { user: userInfo },
        process.env.JWT_SECRET || generateJWTSecret()
    );

    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
};
