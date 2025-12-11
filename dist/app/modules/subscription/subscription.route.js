"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRouter = void 0;
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = require("./subscription.controller");
const checkAuth_1 = require("../../middlewires/checkAuth");
exports.subscriptionRouter = express_1.default.Router();
exports.subscriptionRouter.post("/", subscription_controller_1.SubscriptionController.createSubscription);
exports.subscriptionRouter.get("/", subscription_controller_1.SubscriptionController.getAllSubscriptions);
exports.subscriptionRouter.get("/:id", (0, checkAuth_1.checkAuth)("admin"), subscription_controller_1.SubscriptionController.getSingleSubscription);
exports.subscriptionRouter.patch("/:id", (0, checkAuth_1.checkAuth)("admin"), subscription_controller_1.SubscriptionController.updateSubscription);
exports.subscriptionRouter.delete("/:id", subscription_controller_1.SubscriptionController.deleteSubscription);
