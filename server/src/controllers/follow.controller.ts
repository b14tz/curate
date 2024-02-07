import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const createFollow = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        await db.follow.create({
            data: {
                followerId: data.followerId,
                followingId: data.followingId,
            },
        });
        res.status(200).json({ message: "Successfully followed user" });
    } catch (error) {
        console.error(error);
    }
};

export const deleteFollow = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        await db.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: data.followerId,
                    followingId: data.followingId,
                },
            },
        });
        res.status(200).json({ message: "Successfully unfollowed user" });
    } catch (error) {
        console.error(error);
    }
};
