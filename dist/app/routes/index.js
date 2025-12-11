"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const books_route_1 = require("../modules/books/books.route");
const user_route_1 = require("../modules/user/user.route");
const subscription_route_1 = require("../modules/subscription/subscription.route");
const auth_route_1 = require("../modules/auth/auth.route");
const borrow_route_1 = require("../modules/borrow/borrow.route");
const payment_route_1 = require("../modules/payment/payment.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/books",
        route: books_route_1.booksRouter,
    },
    {
        path: "/user",
        route: user_route_1.userRouter,
    },
    {
        path: "/subscriptions",
        route: subscription_route_1.subscriptionRouter,
    },
    {
        path: "/borrow",
        route: borrow_route_1.borrowRouter,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
