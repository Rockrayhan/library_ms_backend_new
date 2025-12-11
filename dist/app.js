"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./app/middlewires/globalErrorHandler");
const payment_webhook_1 = require("./app/modules/payment/payment.webhook");
const app = (0, express_1.default)();
// app.post("/payment/webhook", paymentWebhook, handleWebhook);
app.post("/payment/webhook", express_1.default.raw({ type: "application/json" }), payment_webhook_1.handleWebhook);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://next-portfolio-frontend-pi.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use("/api", routes_1.router);
// app.post("/payment/webhook", express.raw({ type: "application/json" }), paymentWebhook, handleWebhook);
app.use(globalErrorHandler_1.globalErrorHandler);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
