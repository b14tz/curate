"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controllers/search.controller");
const searchRoutes = (0, express_1.Router)();
searchRoutes.post("/posts", search_controller_1.searchPosts);
searchRoutes.post("/users", search_controller_1.searchUsers);
exports.default = searchRoutes;
