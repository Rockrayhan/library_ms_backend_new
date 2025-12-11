import { ISubscription } from "./subscription.interface";
import { Subscription } from "./subscription.model";
import httpStatus from "http-status-codes";
import { AppError } from "../../errorHelpers/AppError";

export const SubscriptionService = {
  // ================================
  // CREATE SUBSCRIPTION
  // ================================
  createSubscription: async (payload: ISubscription) => {
    return Subscription.create(payload);
  },

  // ================================
  // GET ALL
  // ================================
  getAllSubscriptions: async () => {
    return Subscription.find();
  },

  // ================================
  // GET SINGLE
  // ================================
  getSingleSubscription: async (id: string) => {
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      throw new AppError(httpStatus.NOT_FOUND, "Subscription not found");
    }
    return subscription;
  },

  // ================================
  // UPDATE
  // ================================
  updateSubscription: async (id: string, payload: Partial<ISubscription>) => {
    const subscription = await Subscription.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!subscription) {
      throw new AppError(httpStatus.NOT_FOUND, "Subscription not found");
    }

    return subscription;
  },

  // ================================
  // DELETE
  // ================================
  deleteSubscription: async (id: string) => {
    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      throw new AppError(httpStatus.NOT_FOUND, "Subscription not found");
    }

    return subscription;
  },
};
