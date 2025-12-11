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
exports.SubscriptionController = void 0;
const subscription_service_1 = require("./subscription.service");
const CatchAsync_1 = require("../../ultis/CatchAsync");
exports.SubscriptionController = {
    createSubscription: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subscription = yield subscription_service_1.SubscriptionService.createSubscription(req.body);
        res.status(201).json({
            success: true,
            message: "Subscription created",
            data: subscription,
        });
    })),
    getAllSubscriptions: (0, CatchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subscriptions = yield subscription_service_1.SubscriptionService.getAllSubscriptions();
        res.status(200).json({
            success: true,
            message: "Subscriptions retrieved",
            data: subscriptions,
        });
    })),
    getSingleSubscription: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subscription = yield subscription_service_1.SubscriptionService.getSingleSubscription(req.params.id);
        if (!subscription) {
            return res
                .status(404)
                .json({ success: false, message: "Subscription not found" });
        }
        res.status(200).json({ success: true, data: subscription });
    })),
    updateSubscription: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subscription = yield subscription_service_1.SubscriptionService.updateSubscription(req.params.id, req.body);
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
    })),
    deleteSubscription: (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subscription = yield subscription_service_1.SubscriptionService.deleteSubscription(req.params.id);
        if (!subscription) {
            return res
                .status(404)
                .json({ success: false, message: "Subscription not found" });
        }
        res.status(200).json({ success: true, message: "Subscription deleted" });
    })),
};
