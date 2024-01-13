"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const commentRoutes = (0, express_1.Router)();
commentRoutes.get("/all/:id", comment_controller_1.getAllPostComments);
commentRoutes.post("/:id", comment_controller_1.createComment);
commentRoutes.delete("/:id", comment_controller_1.deleteComment);
exports.default = commentRoutes;
