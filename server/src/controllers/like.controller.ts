import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const getAllPostLikes = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const likes = await db.postLike.findMany({ where: { postId } });
        return res.status(200).send(likes);
    } catch (error) {
        console.error(error);
    }
};

export const createLike = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const like = await db.postLike.create({
            data: {
                postId,
                userId,
            },
        });
        return res.status(200).send(like);
    } catch (error) {
        console.error(error);
    }
};

export const deleteLike = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await db.postLike.delete({ where: { id } });
        return res.status(200).send("Successfully deleted like");
    } catch (error) {
        console.error(error);
    }
};
