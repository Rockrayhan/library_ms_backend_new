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
exports.BorrowService = void 0;
// borrow.service.ts
const borrow_model_1 = require("./borrow.model");
const user_model_1 = require("../user/user.model");
const books_model_1 = require("../books/books.model");
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errorHelpers/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.BorrowService = {
    // =========================================================
    // CREATE BORROW
    // =========================================================
    createBorrow: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { user: userId, book: bookId, quantity, dueDate } = payload;
        // Validate IDs
        if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(bookId)) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Invalid user or book ID");
        }
        // Fetch user with subscription
        const user = yield user_model_1.User.findById(userId).populate("subscription");
        if (!user) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        if (!user.subscription) {
            throw new AppError_1.AppError(http_status_codes_1.default.FORBIDDEN, "you are not Subscribed. Please buy a Subscription Plan");
        }
        const subscription = user.subscription;
        // Check borrow limit
        if (user.borrowedBooks + quantity > subscription.borrowLimit) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, `Borrow limit exceeded. Upgrade your subscription plan.`);
        }
        // Check book exists
        const book = yield books_model_1.Book.findById(bookId);
        if (!book) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Book not found");
        }
        // Check availability
        if (book.availableCopies < quantity) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, `Only ${book.availableCopies} copies available`);
        }
        // Instance method: decrease book quantity
        book.borrowBook(quantity);
        yield book.save();
        // Increase user's borrow count
        user.borrowedBooks += quantity;
        yield user.save();
        // Create borrow record
        return borrow_model_1.Borrow.create({
            user: userId,
            book: bookId,
            quantity,
            dueDate,
            returned: false,
        });
    }),
    // =========================================================
    // RETURN BORROWED BOOK
    // =========================================================
    returnBorrow: (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
        const borrow = yield borrow_model_1.Borrow.findById(borrowId);
        if (!borrow) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Borrow record not found");
        }
        if (borrow.returned) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Book has already been returned");
        }
        const user = yield user_model_1.User.findById(borrow.user);
        const book = yield books_model_1.Book.findById(borrow.book);
        if (!user || !book) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User or book not found");
        }
        // Add book copies back
        book.availableCopies += borrow.quantity;
        if (book.availableCopies > 0)
            book.available = true;
        yield book.save();
        // Adjust user's borrow count
        user.borrowedBooks -= borrow.quantity;
        if (user.borrowedBooks < 0)
            user.borrowedBooks = 0;
        yield user.save();
        // Mark borrow as returned
        borrow.returned = true;
        yield borrow.save();
        return borrow;
    }),
    // currently having books by the user
    getUserCurrentBorrows: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return borrow_model_1.Borrow.find({ user: userId, returned: false }).populate("book");
    }),
    // =========================================================
    // USER BORROW LIST
    // =========================================================
    getUserBorrows: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return borrow_model_1.Borrow.find({ user: userId }).populate("book");
    }),
    // =========================================================
    // ALL BORROWS (ADMIN)
    // =========================================================
    getAllBorrows: () => __awaiter(void 0, void 0, void 0, function* () {
        return borrow_model_1.Borrow.find().populate("user book");
    }),
};
