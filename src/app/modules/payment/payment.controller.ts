import { Request, Response } from "express";
import { Subscription } from "../subscription/subscription.model";
import { User } from "../user/user.model";
import { stripe } from "../../ultis/stripe";
import { Coupon } from "../coupon/coupon.model"; // 🔥 import coupon

export const PaymentController = {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { planId, couponCode } = req.body;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const plan = await Subscription.findById(planId);
      if (!plan) return res.status(404).json({ message: "Plan not found" });

      let finalPrice = plan.price;

      // 🔥 apply coupon if provided
      if (couponCode) {
        const coupon = await Coupon.findOne({
          code: couponCode,
          isActive: true,
          expiresAt: { $gte: new Date() },
        });

        if (!coupon) {
          return res.status(400).json({ message: "Invalid or expired coupon" });
        }

        finalPrice = finalPrice - (finalPrice * coupon.discountPercent) / 100;
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: Math.round(finalPrice * 100),
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
          appliedCoupon: couponCode || "", // log usage
        },
      });

      res.json({ url: session.url, price: finalPrice });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
