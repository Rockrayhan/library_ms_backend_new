import express from "express";

import { checkAuth } from "../../middlewires/checkAuth";
import { CouponController } from "./coupon.controller";

const router = express.Router();

// only admin can create coupons
// router.post("/create", checkAuth("admin"), CouponController.create);
router.post("/create", CouponController.create);

// validate coupon
// router.post("/validate", checkAuth("user"), CouponController.validate);
router.post("/validate", CouponController.validate);

export const CouponRoutes = router;
