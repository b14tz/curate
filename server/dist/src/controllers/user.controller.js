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
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const db_server_1 = require("../utils/db.server");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, id } = data;
        const result = yield db_server_1.db.user.create({
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
        const result = yield db_server_1.db.user.findFirst({ where: { id } });
        console.log(result);
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error getting user data`);
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    try {
        yield db_server_1.db.user.update({ where: { id }, data: Object.assign({}, data) });
    }
    catch (error) {
        return res.status(500).send("Error updating user");
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_server_1.db.user.delete({ where: { id } });
        return null;
    }
    catch (error) {
        console.error(`Error deleting user: ${error}`);
        return null;
    }
});
exports.deleteUser = deleteUser;
