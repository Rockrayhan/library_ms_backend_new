import { Book } from "./books.model";
import { Types } from "mongoose";
import { AppError } from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

export const BooksService = {
  // =========================================================
  // CREATE BOOK
  // =========================================================
  createBook: async (payload: any) => {
    try {
      if (payload.availableCopies === 0) {
        payload.available = false;
      }
      return await Book.create(payload);
    } catch (error: any) {
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }
  },

  // =========================================================
  // GET ALL BOOKS
  // =========================================================
  getAllBooks: async (query: any) => {
    const filterGenre = query.filter as string;
    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sort || "desc";
    const limit = parseInt(query.limit as string) || 10;

    // FILTER BUILDER
    const filter: any = {};
    if (filterGenre) filter.genre = filterGenre;

    // SORTING
    const sortCondition: any = {};
    sortCondition[sortBy] = sortOrder === "asc" ? 1 : -1;

    try {
      return await Book.find(filter).sort(sortCondition).limit(limit);
    } catch (err: any) {
      throw new AppError(httpStatus.BAD_REQUEST, err.message);
    }
  },

  // =========================================================
  // GET SINGLE BOOK
  // =========================================================
  getSingleBook: async (bookId: string) => {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid book ID");
    }

    const book = await Book.findById(bookId);
    if (!book) {
      throw new AppError(httpStatus.NOT_FOUND, "Book not found");
    }

    return book;
  },

  // =========================================================
  // UPDATE BOOK
  // =========================================================
  updateBook: async (bookId: string, payload: any) => {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid book ID");
    }

    if ("availableCopies" in payload) {
      const availableCopies = Number(payload.availableCopies);
      payload.available = availableCopies > 0;
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, payload, {
      new: true,
    });

    if (!updatedBook) {
      throw new AppError(httpStatus.NOT_FOUND, "Book not found");
    }

    return updatedBook;
  },

  // =========================================================
  // DELETE BOOK
  // =========================================================
  deleteBook: async (bookId: string) => {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid book ID");
    }

    const deleted = await Book.findByIdAndDelete(bookId);
    if (!deleted) {
      throw new AppError(httpStatus.NOT_FOUND, "Book not found");
    }

    return deleted;
  },
};
