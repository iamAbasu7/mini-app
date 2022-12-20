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
exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = void 0;
const database_1 = require("../database");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield database_1.pool.query("SELECT * FROM tbl_user");
        return res.status(200).json(userInfo.rows);
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userEmail } = req.body;
        const addUser = yield database_1.pool.query("INSERT INTO tbl_user (user_name,user_email_id) VALUES ($1,$2)", [userName, userEmail]);
        return res.status(200).json({ message: "user created successfully", body: { user: { userName, userEmail } } });
    }
    catch (error) {
        return res.status(500).json("Server Error");
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.params.userId)
        // res.send("deleting")
        const { userId } = req.body;
        // const {userId} = req.body;
        const removeUser = yield database_1.pool.query("DELETE FROM tbl_user WHERE user_id=$1", [userId]);
        return res.status(200).json({ message: `user ${userId} deleted successfully` });
    }
    catch (error) {
        return res.status(500).json("Server Error");
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const id = parseInt(req.params.userId);
        const { userId, userName, userEmail } = req.body;
        console.log(userId);
        console.log(userName);
        console.log(userEmail);
        const userUpdate = yield database_1.pool.query("UPDATE tbl_user SET user_name=$1, user_email_id=$2 WHERE user_id=$3", [userName, userEmail, userId]);
        return res.status(200).json({ message: `user ${userId} updated successfully` });
    }
    catch (error) {
        return res.status(500).json("Server Error");
    }
});
exports.updateUser = updateUser;
