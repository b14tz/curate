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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.findOrCreateUser = exports.getUser = exports.createUser = void 0;
const db_server_1 = require("../utils/db.server");
const createUser = ({ firstName, lastName, username, email, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_server_1.db.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                displayName: username,
                email: email,
                bio: "",
                connectedToSpotify: false,
                connectedToApple: false,
            },
        });
        return result;
    }
    catch (error) {
        console.log(`Error with creating a user: ${error}`);
        return null;
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield db_server_1.db.user.findFirst({
            where: { id },
            include: {
                followers: true,
                following: true,
                likes: true,
                comments: true,
            },
        });
        console.log(result);
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error getting user data`);
    }
});
exports.getUser = getUser;
const findOrCreateUser = ({ firstName, lastName, username, email, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield db_server_1.db.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return existingUser;
        }
        else {
            const newUser = yield (0, exports.createUser)({
                firstName,
                lastName,
                username,
                email,
            });
            return newUser;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.findOrCreateUser = findOrCreateUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    try {
        yield db_server_1.db.user.update({ where: { id }, data: Object.assign({}, data) });
        return res.status(200).send("Successfully updated user");
    }
    catch (error) {
        return res.status(500).send("Error updating user");
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield db_server_1.db.user.delete({ where: { id } });
        return res.status(200).send("Successfully deleted user");
    }
    catch (error) {
        return res.status(500).send(`Error deleting user: ${error}`);
    }
});
exports.deleteUser = deleteUser;
