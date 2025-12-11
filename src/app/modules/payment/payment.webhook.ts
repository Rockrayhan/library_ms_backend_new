import express from "express";
import Stripe from "stripe";
import { Types } from "mongoose";
import { User } from "../user/user.model";

import { stripe } from "../../ultis/stripe";

export const paymentWebhook = express.raw({ type: "application/json" });
export const handleWebhook = async (req: any, res: any) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("Webhook received event type:", event.type);
  } catch (err: any) {
    console.log("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Webhook session metadata:", session.metadata);

    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;

    if (!userId || !planId) {
      console.log("Missing metadata in webhook", session.metadata);
      return res.status(400).send("Missing metadata");
    }

    try {
      const updated = await User.findByIdAndUpdate(
        userId,
        { subscription: new Types.ObjectId(planId) },
        { new: true }
      );

      if (!updated) console.log("User not found for webhook", userId);
      else console.log(`User ${userId} subscription updated to plan ${planId}`);
    } catch (err: any) {
      console.log("Error updating user subscription:", err.message);
    }
  }

  res.json({ received: true });
};
