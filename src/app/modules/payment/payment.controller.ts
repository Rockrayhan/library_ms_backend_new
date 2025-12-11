import { Request, Response } from "express";

import { Subscription } from "../subscription/subscription.model";
import { User } from "../user/user.model";
import { stripe } from "../../ultis/stripe";

export const PaymentController = {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId; 
      const { planId } = req.body;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const plan = await Subscription.findById(planId);
      if (!plan) return res.status(404).json({ message: "Plan not found" });

      console.log("Creating Stripe session for user:", user._id, "plan:", plan._id);

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: plan.price * 100,
              product_data: { name: `${plan.planName} subscription` },
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
        metadata: {
          userId: user._id.toString(),
          planId: plan._id.toString(),
        },
      });

      console.log("Stripe session created:", session.id, session.metadata);

      res.json({ url: session.url });
    } catch (error: any) {
      console.log("Error creating Stripe session:", error);
      res.status(500).json({ message: error.message });
    }
  },
};
