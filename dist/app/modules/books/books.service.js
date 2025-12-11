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
exports.BooksService = void 0;
const books_model_1 = require("./books.model");
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errorHelpers/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.BooksService = {
    // =========================================================
    // CREATE BOOK
    // =========================================================
    createBook: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (payload.availableCopies === 0) {
                payload.available = false;
            }
            return yield books_model_1.Book.create(payload);
        }
        catch (error) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, error.message);
        }
    }),
    // =========================================================
    // GET ALL BOOKS
    // =========================================================
    getAllBooks: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const filterGenre = query.filter;
        const sortBy = query.sortBy || "createdAt";
        const sortOrder = query.sort || "desc";
        const limit = parseInt(query.limit) || 10;
        // FILTER BUILDER
        const filter = {};
        if (filterGenre)
            filter.genre = filterGenre;
        // SORTING
        const sortCondition = {};
        sortCondition[sortBy] = sortOrder === "asc" ? 1 : -1;
        try {
            return yield books_model_1.Book.find(filter).sort(sortCondition).limit(limit);
        }
        catch (err) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, err.message);
        }
    }),
    // =========================================================
    // GET SINGLE BOOK
    // =========================================================
    getSingleBook: (bookId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.Types.ObjectId.isValid(bookId)) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Invalid book ID");
        }
        const book = yield books_model_1.Book.findById(bookId);
        if (!book) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Book not found");
        }
        return book;
    }),
    // =========================================================
    // UPDATE BOOK
    // =========================================================
    updateBook: (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.Types.ObjectId.isValid(bookId)) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Invalid book ID");
        }
        if ("availableCopies" in payload) {
            const availableCopies = Number(payload.availableCopies);
            payload.available = availableCopies > 0;
        }
        const updatedBook = yield books_model_1.Book.findByIdAndUpdate(bookId, payload, {
            new: true,
        });
        if (!updatedBook) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Book not found");
        }
        return updatedBook;
    }),
    // =========================================================
    // DELETE BOOK
    // =========================================================
    deleteBook: (bookId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.Types.ObjectId.isValid(bookId)) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Invalid book ID");
        }
        const deleted = yield books_model_1.Book.findByIdAndDelete(bookId);
        if (!deleted) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Book not found");
        }
        return deleted;
    }),
};
