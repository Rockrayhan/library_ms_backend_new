import express from "express";
import { BooksController } from "./books.controller";
import { checkAuth } from "../../middlewires/checkAuth";


export const booksRouter = express.Router();

booksRouter.get("/", BooksController.getAllBooks);
booksRouter.post("/create-book", checkAuth('admin') ,BooksController.createBook);
booksRouter.get("/:bookId",  BooksController.getSingleBook);
booksRouter.patch("/:bookId", checkAuth('admin') , BooksController.updateBook);
booksRouter.delete("/:bookId", checkAuth('admin') , BooksController.deleteBook);
