import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const getAllPostComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const comments = await db.postComment.findMany({ where: { postId } });
        return res.status(200).send(comments);
    } catch (error) {
        console.error(error);
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { content, authorId }: { content: string; authorId: string } =
            req.body;
        const comment = await db.postComment.create({
            data: { authorId, postId, content },
        });
        return res.status(200).send(comment);
    } catch (error) {
        console.error(error);
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { authorId } = req.body;
        await db.postComment.delete({
            where: { postId_authorId: { postId: postId, authorId } },
        });
        return res.status(200).send("Successfully deleted comment");
    } catch (error) {
        console.error(error);
    }
};
