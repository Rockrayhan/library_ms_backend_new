// borrow.service.ts
import { Borrow } from "./borrow.model";
import { User } from "../user/user.model";
import { Book } from "../books/books.model";
import { Types } from "mongoose";
import { AppError } from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

export const BorrowService = {
  // =========================================================
  // CREATE BORROW
  // =========================================================
  
  createBorrow: async (payload: any) => {
    const { user: userId, book: bookId, quantity, dueDate } = payload;

    // Validate IDs
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(bookId)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid user or book ID");
    }

    // Fetch user with subscription
    const user = await User.findById(userId).populate("subscription");
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (!user.subscription) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "you are not Subscribed. Please buy a Subscription Plan"
      );
    }

    const subscription: any = user.subscription;

    // Check borrow limit
    if (user.borrowedBooks + quantity > subscription.borrowLimit) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Borrow limit exceeded. Upgrade your subscription plan.`
      );
    }

    // Check book exists
    const book = await Book.findById(bookId);
    if (!book) {
      throw new AppError(httpStatus.NOT_FOUND, "Book not found");
    }

    // Check availability
    if (book.availableCopies < quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Only ${book.availableCopies} copies available`
      );
    }

    // Instance method: decrease book quantity
    book.borrowBook(quantity);
    await book.save();

    // Increase user's borrow count
    user.borrowedBooks += quantity;
    await user.save();

    // Create borrow record
    return Borrow.create({
      user: userId,
      book: bookId,
      quantity,
      dueDate,
      returned: false,
    });
  },

  // =========================================================
  // RETURN BORROWED BOOK
  // =========================================================

  returnBorrow: async (borrowId: string) => {
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      throw new AppError(httpStatus.NOT_FOUND, "Borrow record not found");
    }

    if (borrow.returned) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Book has already been returned"
      );
    }

    const user = await User.findById(borrow.user);
    const book = await Book.findById(borrow.book);

    if (!user || !book) {
      throw new AppError(httpStatus.NOT_FOUND, "User or book not found");
    }

    // Add book copies back
    book.availableCopies += borrow.quantity;
    if (book.availableCopies > 0) book.available = true;
    await book.save();

    // Adjust user's borrow count
    user.borrowedBooks -= borrow.quantity;
    if (user.borrowedBooks < 0) user.borrowedBooks = 0;
    await user.save();

    // Mark borrow as returned
    borrow.returned = true;
    await borrow.save();

    return borrow;
  },


  // currently having books by the user
  getUserCurrentBorrows: async (userId: string) => {
    return Borrow.find({ user: userId, returned: false }).populate("book");
  },


  // =========================================================
  // USER BORROW LIST
  // =========================================================
  getUserBorrows: async (userId: string) => {
    return Borrow.find({ user: userId }).populate("book");
  },

  // =========================================================
  // ALL BORROWS (ADMIN)
  // =========================================================
  getAllBorrows: async () => {
    return Borrow.find().populate("user book");
  },
};
