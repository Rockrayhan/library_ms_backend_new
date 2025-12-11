"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = require("mongoose");
const subscriptionPlanSchema = new mongoose_1.Schema({
    planName: { type: String, required: true, enum: ["basic", "premium", "standard"] },
    borrowLimit: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true, versionKey: false });
exports.Subscription = (0, mongoose_1.model)("Subscription", subscriptionPlanSchema);
