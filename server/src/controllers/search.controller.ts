import { Response } from "express";
import { Request } from "express-jwt";
import { db } from "../utils/db.server";

export const searchUsers = async (req: Request, res: Response) => {
    const query = req.body.query;

    if (!query) {
        return res.status(400).send("Query parameter is required");
    }

    try {
        const users = await db.user.findMany({
            where: {
                displayName: {
                    contains: query,
                    //mode: "insensitive",
                },
            },
            include: {
                followers: true,
                following: true,
            },
        });

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const searchPosts = async (req: Request, res: Response) => {
    const query = req.body.query;

    if (!query) {
        return res.status(400).send("Query parameter is required");
    }

    try {
        const posts = await db.post.findMany({
            where: {
                title: {
                    contains: query,
                    //mode: "insensitive",
                },
            },
            include: {
                author: true,
            },
        });

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
