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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const CatchAsync_1 = require("../../ultis/CatchAsync");
const sendResponse_1 = require("../../ultis/sendResponse");
exports.UserController = {
    createUser: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.UserService.createUser(req.body);
        res
            .status(201)
            .json({ success: true, message: "User created", data: user });
    })),
    getAllUsers: (0, CatchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_service_1.UserService.getAllUsers();
        res
            .status(200)
            .json({ success: true, message: "Users retrieved", data: users });
    })),
    getSingleUser: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.UserService.getSingleUser(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, data: user });
    })),
    updateUser: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.UserService.updateUser(req.params.id, req.body);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "User updated", data: user });
    })),
    deleteUser: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.UserService.deleteUser(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, message: "User deleted" });
    })),
    // getMe: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //   const decodedToken = req.user as JwtPayload;
    //   const result = await UserService.getMe(decodedToken.userId);
    //   sendResponse(res, {
    //     success: true,
    //     statusCode: 200,
    //     message: "Your profile Retrieved Successfully",
    //     data: result.data,
    //   });
    // }),
    getMe: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // no user means not logged in
        if (!req.user) {
            return (0, sendResponse_1.sendResponse)(res, {
                success: true,
                statusCode: 200,
                message: "Guest user",
                data: null,
            });
        }
        const decodedToken = req.user;
        const result = yield user_service_1.UserService.getMe(decodedToken.userId);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Your profile Retrieved Successfully",
            data: result.data,
        });
    })),
};
