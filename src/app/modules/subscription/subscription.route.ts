import express from "express";
import { SubscriptionController } from "./subscription.controller";
import { checkAuth } from "../../middlewires/checkAuth";

export const subscriptionRouter = express.Router();

subscriptionRouter.post("/", SubscriptionController.createSubscription);
subscriptionRouter.get("/", SubscriptionController.getAllSubscriptions);

subscriptionRouter.get("/:id", checkAuth("admin"), SubscriptionController.getSingleSubscription);
subscriptionRouter.patch("/:id", checkAuth("admin") ,SubscriptionController.updateSubscription);

subscriptionRouter.delete("/:id", SubscriptionController.deleteSubscription);
