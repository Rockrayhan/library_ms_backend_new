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
exports.BooksController = void 0;
const books_service_1 = require("./books.service");
const CatchAsync_1 = require("../../ultis/CatchAsync");
exports.BooksController = {
    createBook: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield books_service_1.BooksService.createBook(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: result,
        });
    })),
    getAllBooks: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield books_service_1.BooksService.getAllBooks(req.query);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: result,
        });
    })),
    getSingleBook: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield books_service_1.BooksService.getSingleBook(req.params.bookId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: result,
        });
    })),
    updateBook: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield books_service_1.BooksService.updateBook(req.params.bookId, req.body);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: result,
        });
    })),
    deleteBook: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield books_service_1.BooksService.deleteBook(req.params.bookId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    })),
};
