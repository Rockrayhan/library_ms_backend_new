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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errorHelpers/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.UserService = {
    // =========================================================
    // CREATE USER
    // =========================================================
    createUser: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield user_model_1.User.create(payload);
        }
        catch (error) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, error.message);
        }
    }),
    // =========================================================
    // GET ALL USERS
    // =========================================================
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return user_model_1.User.find().populate("subscription");
    }),
    // =========================================================
    // GET SINGLE USER
    // =========================================================
    getSingleUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Invalid user ID");
        }
        const user = yield user_model_1.User.findById(id).populate("subscription");
        if (!user) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        return user;
    }),
    // =========================================================
    // UPDATE USER
    // =========================================================
    updateUser: (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Invalid user ID");
        }
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, payload, {
            new: true,
        }).populate("subscription");
        if (!updatedUser) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        return updatedUser;
    }),
    // =========================================================
    // DELETE USER
    // =========================================================
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Invalid user ID");
        }
        const deleted = yield user_model_1.User.findByIdAndDelete(id);
        if (!deleted) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        return deleted;
    }),
    // =========================================================
    // GET LOGGED-IN USER (ME)
    // =========================================================
    getMe: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Invalid user ID");
        }
        const user = yield user_model_1.User.findById(userId).select("-password").populate("subscription");
        if (!user) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        return { data: user };
    }),
};
