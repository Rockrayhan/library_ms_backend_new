import express from "express";

import { checkAuth } from "../../middlewires/checkAuth";
import { PaymentController } from "./payment.controller";
import { catchAsync } from "../../ultis/CatchAsync";


const router = express.Router();

router.post(
  "/create-checkout-session",
  checkAuth("user"),
  catchAsync(PaymentController.createCheckoutSession)
);

export const PaymentRoutes = router;
