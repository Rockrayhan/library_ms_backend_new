import { Request, Response } from "express";
import { BooksService } from "./books.service";
import { catchAsync } from "../../ultis/CatchAsync";


export const BooksController = {
  createBook: catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await BooksService.createBook(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  }),

  getAllBooks: catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await BooksService.getAllBooks(req.query);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  }),

  getSingleBook: catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await BooksService.getSingleBook(req.params.bookId);

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
  }),

  updateBook: catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await BooksService.updateBook(req.params.bookId, req.body);

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
  }),

  deleteBook: catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await BooksService.deleteBook(req.params.bookId);

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
  }),
};
