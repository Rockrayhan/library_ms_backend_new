import { catchAsync } from "../../ultis/CatchAsync";
import { sendResponse } from "../../ultis/sendResponse";
import { ReviewService } from "./review.service";

export const createReview = catchAsync(async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const payload = {
    ...req.body,
    userId: req.user.userId,
  };

  const review = await ReviewService.createReview(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review added successfully",
    data: review,
  });
});

export const getBookReviews = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  const reviews = await ReviewService.getReviewsByBook(bookId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews fetched successfully",
    data: reviews,
  });
});

export const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const updated = await ReviewService.updateReview(id, { rating, comment });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: updated,
  });
});

export const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await ReviewService.getAllReviews();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews fetched successfully",
    data: reviews,
  });
});

export const updateReviewStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const updated = await ReviewService.updateReviewStatus(id, isActive);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review status updated successfully",
    data: updated,
  });
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deleted = await ReviewService.deleteReview(id);

  if (!deleted) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Review not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: deleted,
  });
});
