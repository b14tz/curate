import { Router } from "express";
import bodyParser from "body-parser";
import { createUser, deleteUser } from "../controllers/user.controller";

const webhookRoutes = Router();

webhookRoutes.post(
    "/",
    bodyParser.raw({ type: "application/json" }),
    async function (req, res) {
        try {
            console.log("hi");
            console.log(req.body);
            const payload = req.body;
            const { id } = payload.data;
            const eventType = payload.type;
            if (eventType === "user.created") {
                console.log(`User ${id} was ${eventType}`);
                await createUser(payload.data);
            }
            if (eventType === "user.deleted") {
                console.log(`User ${id} was ${eventType}`);
                await deleteUser(id);
            }
            res.status(200).json({
                success: true,
                message: "Webhook received",
            });
        } catch (error) {
            res.status(400).send(`Error with validating the webhook: ${error}`);
        }
    }
);

export default webhookRoutes;
