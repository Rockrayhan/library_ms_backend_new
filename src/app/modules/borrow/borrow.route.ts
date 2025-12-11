// borrow.route.ts
import express from "express";
import { BorrowController } from "./borrow.controller";
import { checkAuth } from "../../middlewires/checkAuth";

export const borrowRouter = express.Router();

// User borrow a book
borrowRouter.post("/", BorrowController.createBorrow);

// Return a book
borrowRouter.patch("/return/:borrowId", checkAuth("admin"), BorrowController.returnBorrow);
// borrowRouter.patch("/return/:borrowId", BorrowController.returnBorrow);


// borrow.route.ts
borrowRouter.get("/current/:userId", BorrowController.getUserCurrentBorrows);


// User borrow history list
// borrowRouter.get("/user/:userId", checkAuth("user", "admin"), BorrowController.getUserBorrows);
borrowRouter.get("/user/:userId" , BorrowController.getUserBorrows);

// Admin only - all borrows
borrowRouter.get("/", checkAuth("admin"), BorrowController.getAllBorrows);
// borrowRouter.get("/", BorrowController.getAllBorrows);
