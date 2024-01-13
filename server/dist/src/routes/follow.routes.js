"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follow_controller_1 = require("../controllers/follow.controller");
const followRoutes = (0, express_1.Router)();
followRoutes.post("/", follow_controller_1.followUser);
followRoutes.post("/remove", follow_controller_1.unfollowUser);
exports.default = followRoutes;
