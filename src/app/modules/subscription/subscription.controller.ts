import { Request, Response } from "express";
import { SubscriptionService } from "./subscription.service";
import { catchAsync } from "../../ultis/CatchAsync";

export const SubscriptionController = {
  createSubscription: catchAsync(async (req: Request, res: Response) => {
    const subscription = await SubscriptionService.createSubscription(req.body);
    res.status(201).json({
      success: true,
      message: "Subscription created",
      data: subscription,
    });
  }),

  getAllSubscriptions: catchAsync(async (_req: Request, res: Response) => {
    const subscriptions = await SubscriptionService.getAllSubscriptions();
    res.status(200).json({
      success: true,
      message: "Subscriptions retrieved",
      data: subscriptions,
    });
  }),

  getSingleSubscription: catchAsync(async (req: Request, res: Response) => {
    const subscription = await SubscriptionService.getSingleSubscription(
      req.params.id
    );
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }
    res.status(200).json({ success: true, data: subscription });
  }),

  updateSubscription: catchAsync(async (req: Request, res: Response) => {
    const subscription = await SubscriptionService.updateSubscription(
      req.params.id,
      req.body
    );
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Subscription updated",
        data: subscription,
      });
  }),

  deleteSubscription: catchAsync(async (req: Request, res: Response) => {
    const subscription = await SubscriptionService.deleteSubscription(
      req.params.id
    );
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }
    res.status(200).json({ success: true, message: "Subscription deleted" });
  }),
};
