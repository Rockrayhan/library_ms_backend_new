"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewires/checkAuth");
const payment_controller_1 = require("./payment.controller");
const CatchAsync_1 = require("../../ultis/CatchAsync");
const router = express_1.default.Router();
router.post("/create-checkout-session", (0, checkAuth_1.checkAuth)("user"), (0, CatchAsync_1.catchAsync)(payment_controller_1.PaymentController.createCheckoutSession));
exports.PaymentRoutes = router;
