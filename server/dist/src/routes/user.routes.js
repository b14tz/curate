"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRoutes = (0, express_1.Router)();
// public routes
userRoutes.get("/:id", user_controller_1.getUser);
// authentication token goes here
// private routes
userRoutes.post("/", user_controller_1.createUser);
userRoutes.post("/:id", user_controller_1.updateUser);
userRoutes.delete("/:id", user_controller_1.deleteUser);
exports.default = userRoutes;
