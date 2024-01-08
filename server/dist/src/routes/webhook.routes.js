"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const user_controller_1 = require("../controllers/user.controller");
const webhookRoutes = (0, express_1.Router)();
webhookRoutes.post("/", body_parser_1.default.raw({ type: "application/json" }), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("hi");
            console.log(req.body);
            const payload = req.body;
            const { id } = payload.data;
            const eventType = payload.type;
            if (eventType === "user.created") {
                console.log(`User ${id} was ${eventType}`);
                yield (0, user_controller_1.createUser)(payload.data);
            }
            if (eventType === "user.deleted") {
                console.log(`User ${id} was ${eventType}`);
                yield (0, user_controller_1.deleteUser)(id);
            }
            res.status(200).json({
                success: true,
                message: "Webhook received",
            });
        }
        catch (error) {
            res.status(400).send(`Error with validating the webhook: ${error}`);
        }
    });
});
exports.default = webhookRoutes;
