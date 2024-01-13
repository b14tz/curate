import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const followUser = async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    try {
        await db.follow.create({
            data: {
                followerId: data.followerId,
                followingId: data.followingId,
            },
        });
        return res.status(200).send("Successfully followed user");
    } catch (error) {
        console.error(error);
    }
};

export const unfollowUser = async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    try {
        await db.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: data.followerId,
                    followingId: data.followingId,
                },
            },
        });
        return res.status(200).send("Successfully unfollowed user");
    } catch (error) {
        console.error(error);
    }
};
