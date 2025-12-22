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

router.get("/", CouponController.getAll); 
router.patch("/status/:id", CouponController.updateStatus); // update active/inactive
router.delete("/:id", CouponController.delete); // delete coupon

export const CouponRoutes = router;
