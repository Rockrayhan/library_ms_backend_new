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
exports.SubscriptionService = void 0;
const subscription_model_1 = require("./subscription.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = require("../../errorHelpers/AppError");
exports.SubscriptionService = {
    // ================================
    // CREATE SUBSCRIPTION
    // ================================
    createSubscription: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        return subscription_model_1.Subscription.create(payload);
    }),
    // ================================
    // GET ALL
    // ================================
    getAllSubscriptions: () => __awaiter(void 0, void 0, void 0, function* () {
        return subscription_model_1.Subscription.find();
    }),
    // ================================
    // GET SINGLE
    // ================================
    getSingleSubscription: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const subscription = yield subscription_model_1.Subscription.findById(id);
        if (!subscription) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Subscription not found");
        }
        return subscription;
    }),
    // ================================
    // UPDATE
    // ================================
    updateSubscription: (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const subscription = yield subscription_model_1.Subscription.findByIdAndUpdate(id, payload, {
            new: true,
        });
        if (!subscription) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Subscription not found");
        }
        return subscription;
    }),
    // ================================
    // DELETE
    // ================================
    deleteSubscription: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const subscription = yield subscription_model_1.Subscription.findByIdAndDelete(id);
        if (!subscription) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Subscription not found");
        }
        return subscription;
    }),
};
