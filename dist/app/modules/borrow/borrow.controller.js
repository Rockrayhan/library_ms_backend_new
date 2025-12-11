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
exports.BorrowController = void 0;
const borrow_service_1 = require("./borrow.service");
const CatchAsync_1 = require("../../ultis/CatchAsync");
exports.BorrowController = {
    createBorrow: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield borrow_service_1.BorrowService.createBorrow(req.body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: result,
        });
    })),
    returnBorrow: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield borrow_service_1.BorrowService.returnBorrow(req.params.borrowId);
        res.status(200).json({
            success: true,
            message: "Book returned successfully",
            data: result,
        });
    })),
    getUserCurrentBorrows: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield borrow_service_1.BorrowService.getUserCurrentBorrows(req.params.userId);
        res.status(200).json({
            success: true,
            message: "User's currently borrowed books",
            data: result,
        });
    })),
    getUserBorrows: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield borrow_service_1.BorrowService.getUserBorrows(req.params.userId);
        res.status(200).json({
            success: true,
            message: "User borrow list",
            data: result,
        });
    })),
    getAllBorrows: (0, CatchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield borrow_service_1.BorrowService.getAllBorrows();
        res.status(200).json({
            success: true,
            message: "All borrow records",
            data: result,
        });
    })),
};
