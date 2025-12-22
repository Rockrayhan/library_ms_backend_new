import { Router } from "express";
import { booksRouter } from "../modules/books/books.route";
import { userRouter } from "../modules/user/user.route";
import { subscriptionRouter } from "../modules/subscription/subscription.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { borrowRouter } from "../modules/borrow/borrow.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { CouponRoutes } from "../modules/coupon/coupon.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/books",
    route: booksRouter,
  },
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/subscriptions",
    route: subscriptionRouter,
  },
  {
    path: "/borrow",
    route: borrowRouter,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/coupon",
    route: CouponRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
