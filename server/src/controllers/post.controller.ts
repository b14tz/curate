import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const createPost = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await db.post.create({ data: { ...data } });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error creating post`);
    }
};

export const getPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await db.user.findFirst({ where: { id } });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error getting user data`);
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
        await db.user.update({ where: { id }, data: { ...data } });
    } catch (error) {
        return res.status(500).send("Error updating user");
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await db.user.delete({ where: { id } });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error deleting user`);
    }
};
