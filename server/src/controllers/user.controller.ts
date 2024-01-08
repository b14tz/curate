import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const createUser = async (data: any) => {
    try {
        const { first_name, last_name, username, id } = data;
        const result = await db.user.create({
            data: {
                id,
                firstName: first_name,
                lastName: last_name,
                displayName: username,
                email: "",
                bio: "",
                connectedToSpotify: false,
                connectedToApple: false,
            },
        });
        return result;
    } catch (error) {
        console.log(`Error with creating a user: ${error}`);
        return null;
    }
};

export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await db.user.findFirst({ where: { id } });
        console.log(result);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error getting user data`);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
        await db.user.update({ where: { id }, data: { ...data } });
    } catch (error) {
        return res.status(500).send("Error updating user");
    }
};

export const deleteUser = async (id: string) => {
    try {
        await db.user.delete({ where: { id } });
        return null;
    } catch (error) {
        console.error(`Error deleting user: ${error}`);
        return null;
    }
};
