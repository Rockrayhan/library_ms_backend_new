import { Types } from "mongoose";



export interface ISubscription {
  _id: Types.ObjectId;
  planName: "basic" | "premium" | "standard";
  borrowLimit: number;
  price: number ; 
  createdAt?: Date;
  updatedAt?: Date;
}
