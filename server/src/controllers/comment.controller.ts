import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const getAllPostComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const comments = await db.postComment.findMany({
            where: { postId },
            include: { author: true },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).send(comments);
    } catch (error) {
        console.error(error);
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        const {
            content,
            userId,
            postId,
        }: { content: string; userId: string; postId: string } = req.body;
        const comment = await db.postComment.create({
            data: { authorId: userId, postId, content },
            include: { author: true },
        });
        return res.status(200).send(comment);
    } catch (error) {
        console.error(error);
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedComment = await db.postComment.delete({
            where: { id },
            include: { post: true },
        });
        return res.status(200).json(deletedComment);
    } catch (error) {
        console.error(error);
    }
};
