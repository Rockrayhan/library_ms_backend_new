"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const checkAuth_1 = require("../../middlewires/checkAuth");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/", user_controller_1.UserController.createUser);
exports.userRouter.get("/", (0, checkAuth_1.checkAuth)("admin"), user_controller_1.UserController.getAllUsers);
exports.userRouter.get("/me", (0, checkAuth_1.checkAuth)("admin", "user"), user_controller_1.UserController.getMe);
// userRouter.get("/me", UserController.getMe);
exports.userRouter.get("/:id", user_controller_1.UserController.getSingleUser);
exports.userRouter.patch("/:id", user_controller_1.UserController.updateUser);
exports.userRouter.delete("/:id", user_controller_1.UserController.deleteUser);
