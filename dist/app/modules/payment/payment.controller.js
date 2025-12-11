"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const subscription_model_1 = require("../subscription/subscription.model");
const user_model_1 = require("../user/user.model");
const stripe_1 = require("../../ultis/stripe");
exports.PaymentController = {
    createCheckoutSession: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const { planId } = req.body;
            const user = yield user_model_1.User.findById(userId);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            const plan = yield subscription_model_1.Subscription.findById(planId);
            if (!plan)
                return res.status(404).json({ message: "Plan not found" });
            console.log("Creating Stripe session for user:", user._id, "plan:", plan._id);
            const session = yield stripe_1.stripe.checkout.sessions.create({
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
        }
        catch (error) {
            console.log("Error creating Stripe session:", error);
            res.status(500).json({ message: error.message });
        }
    }),
};
