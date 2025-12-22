import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getBookReviews,
  updateReview,
  updateReviewStatus,
} from "./review.controller";
import { checkAuth } from "../../middlewires/checkAuth";

const router = express.Router();

router.post("/", checkAuth("user"), createReview);

router.get("/:bookId", getBookReviews);

router.patch("/:id", updateReview);

router.get("/", getAllReviews);

router.patch("/status/:id", updateReviewStatus);

router.delete("/:id", deleteReview);


export const ReviewRoutes = router;
