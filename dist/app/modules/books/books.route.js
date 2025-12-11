"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const checkAuth_1 = require("../../middlewires/checkAuth");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.get("/", books_controller_1.BooksController.getAllBooks);
exports.booksRouter.post("/create-book", (0, checkAuth_1.checkAuth)('admin'), books_controller_1.BooksController.createBook);
exports.booksRouter.get("/:bookId", books_controller_1.BooksController.getSingleBook);
exports.booksRouter.patch("/:bookId", (0, checkAuth_1.checkAuth)('admin'), books_controller_1.BooksController.updateBook);
exports.booksRouter.delete("/:bookId", (0, checkAuth_1.checkAuth)('admin'), books_controller_1.BooksController.deleteBook);
