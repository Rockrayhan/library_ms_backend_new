import { Request, Response } from "express";
import { Coupon } from "./coupon.model";

export const CouponController = {
  create: async (req: Request, res: Response) => {
    try {
      const { code, discountPercent, expiresAt } = req.body;

      const coupon = await Coupon.create({
        code,
        discountPercent,
        expiresAt,
      });

      res.json({ message: "Coupon created", coupon });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  validate: async (req: Request, res: Response): Promise<void> => {
    try {
      const { code } = req.body;

      const coupon = await Coupon.findOne({ code });

      if (!coupon || !coupon.isActive) {
        res.status(400).json({ message: "Invalid coupon" });
        return;
      }

      if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        res.status(400).json({ message: "Coupon expired" });
        return;
      }

      res.json({ valid: true, coupon });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const coupons = await Coupon.find();
      res.json({ message: "Coupons fetched", data: coupons });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  
  updateStatus: async (req: Request, res: Response) : Promise<void>  => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const updated = await Coupon.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      );

      if (!updated) {
        res.status(404).json({ message: "Coupon not found" });
        return;
      }

      res.json({ message: "Coupon status updated", coupon: updated });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  // ----------------- New: Delete Coupon -----------------
  delete: async (req: Request, res: Response) : Promise<void> => {
    try {
      const { id } = req.params;

      const deleted = await Coupon.findByIdAndDelete(id);

      if (!deleted) {
        res.status(404).json({ message: "Coupon not found" });
        return ;
      }

      res.json({ message: "Coupon deleted successfully", coupon: deleted });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};
