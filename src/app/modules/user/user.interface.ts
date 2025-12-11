// user.interface.ts
import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  subscription?: Types.ObjectId | null;  
  borrowedBooks : number
  paymentInfo?: {
    cardBrand?: string;
    last4?: string;
    stripeCustomerId?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
