// borrow.model.ts
import { Schema, model } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date},
    returned: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
