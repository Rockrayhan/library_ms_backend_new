import { Review } from "./review.model";

const createReview = async (payload: any) => {
  const review = await Review.create(payload);
  return review;
};

const getReviewsByBook = async (bookId: string) => {
  const reviews = await Review.find({ bookId, isActive: true }).populate(
    "userId",
    "name email"
  );
  return reviews;
};

const updateReview = async (
  reviewId: string,
  payload: { rating?: number; comment?: string }
) => {
  return await Review.findByIdAndUpdate(
    reviewId,
    { ...payload },
    { new: true }
  );
};

const getAllReviews = async () => {
  return await Review.find().populate("userId").populate("bookId");
};

const updateReviewStatus = async (reviewId: string, isActive: boolean) => {
  return await Review.findByIdAndUpdate(reviewId, { isActive }, { new: true });
};


const deleteReview = async (reviewId: string) => {
  return await Review.findByIdAndDelete(reviewId);
};


export const ReviewService = {
  createReview,
  getReviewsByBook,
  getAllReviews,
  updateReviewStatus,
  updateReview,
  deleteReview
};
