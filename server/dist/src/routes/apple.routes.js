"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apple_controller_1 = require("../controllers/apple.controller");
const appleRoutes = (0, express_1.Router)();
appleRoutes.get("/devtoken", apple_controller_1.getAppleDeveloperToken);
exports.default = appleRoutes;
