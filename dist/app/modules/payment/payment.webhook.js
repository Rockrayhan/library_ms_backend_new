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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = exports.paymentWebhook = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
const stripe_1 = require("../../ultis/stripe");
exports.paymentWebhook = express_1.default.raw({ type: "application/json" });
const handleWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("Webhook received event type:", event.type);
    }
    catch (err) {
        console.log("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("Webhook session metadata:", session.metadata);
        const userId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.userId;
        const planId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.planId;
        if (!userId || !planId) {
            console.log("Missing metadata in webhook", session.metadata);
            return res.status(400).send("Missing metadata");
        }
        try {
            const updated = yield user_model_1.User.findByIdAndUpdate(userId, { subscription: new mongoose_1.Types.ObjectId(planId) }, { new: true });
            if (!updated)
                console.log("User not found for webhook", userId);
            else
                console.log(`User ${userId} subscription updated to plan ${planId}`);
        }
        catch (err) {
            console.log("Error updating user subscription:", err.message);
        }
    }
    res.json({ received: true });
});
exports.handleWebhook = handleWebhook;
