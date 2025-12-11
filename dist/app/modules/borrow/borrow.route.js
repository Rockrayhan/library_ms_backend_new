"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
// borrow.route.ts
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("./borrow.controller");
const checkAuth_1 = require("../../middlewires/checkAuth");
exports.borrowRouter = express_1.default.Router();
// User borrow a book
exports.borrowRouter.post("/", borrow_controller_1.BorrowController.createBorrow);
// Return a book
exports.borrowRouter.patch("/return/:borrowId", (0, checkAuth_1.checkAuth)("admin"), borrow_controller_1.BorrowController.returnBorrow);
// borrowRouter.patch("/return/:borrowId", BorrowController.returnBorrow);
// borrow.route.ts
exports.borrowRouter.get("/current/:userId", borrow_controller_1.BorrowController.getUserCurrentBorrows);
// User borrow history list
// borrowRouter.get("/user/:userId", checkAuth("user", "admin"), BorrowController.getUserBorrows);
exports.borrowRouter.get("/user/:userId", borrow_controller_1.BorrowController.getUserBorrows);
// Admin only - all borrows
exports.borrowRouter.get("/", (0, checkAuth_1.checkAuth)("admin"), borrow_controller_1.BorrowController.getAllBorrows);
// borrowRouter.get("/", BorrowController.getAllBorrows);
