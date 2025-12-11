// borrow.controller.ts
import { Request, Response } from "express";
import { BorrowService } from "./borrow.service";
import { catchAsync } from "../../ultis/CatchAsync";

export const BorrowController = {
  createBorrow: catchAsync(async (req: Request, res: Response) => {
    const result = await BorrowService.createBorrow(req.body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: result,
    });
  }),

  returnBorrow: catchAsync(async (req: Request, res: Response) => {
    const result = await BorrowService.returnBorrow(req.params.borrowId);

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: result,
    });
  }),

  
  getUserCurrentBorrows: catchAsync(async (req: Request, res: Response) => {
    const result = await BorrowService.getUserCurrentBorrows(req.params.userId);

    res.status(200).json({
      success: true,
      message: "User's currently borrowed books",
      data: result,
    });
  }),

  getUserBorrows: catchAsync(async (req: Request, res: Response) => {
    const result = await BorrowService.getUserBorrows(req.params.userId);

    res.status(200).json({
      success: true,
      message: "User borrow list",
      data: result,
    });
  }),

  getAllBorrows: catchAsync(async (_req: Request, res: Response) => {
    const result = await BorrowService.getAllBorrows();

    res.status(200).json({
      success: true,
      message: "All borrow records",
      data: result,
    });
  }),
};
