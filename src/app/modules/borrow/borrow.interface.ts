import { Types } from "mongoose";

export interface IBorrow {
  user: Types.ObjectId;
  book: Types.ObjectId;
  quantity: number;
  dueDate?: Date;
  returned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
