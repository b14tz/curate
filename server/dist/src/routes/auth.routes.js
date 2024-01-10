"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = (0, express_1.Router)();
authRoutes.get("/google", auth_controller_1.googleAuth);
authRoutes.get("/google/callback", auth_controller_1.googleAuthCallback);
exports.default = authRoutes;
