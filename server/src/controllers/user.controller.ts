import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const createUser = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await db.user.create({ data: { ...data } });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error creating user`);
    }
};

export const getUser = async (req: Request, res: Response) => {
    const id = +req.params;
    try {
        const result = await db.user.findFirst({ where: { id } });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error getting user data`);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = +req.params;
    const data = req.body;
    try {
        await db.user.update({ where: { id }, data: { ...data } });
    } catch (error) {
        return res.status(500).send("Error updating user");
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = +req.params;
    try {
        await db.user.delete({ where: { id } });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error deleting user`);
    }
};
