import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcryptjs from "bcryptjs";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    subscription: { type: Schema.Types.ObjectId, ref: "Subscription" , default:null },
    borrowedBooks: { type: Number, required: true, default: 0 },
    paymentInfo: {
      cardBrand: { type: String },
      last4: { type: String },
      stripeCustomerId: { type: String },
    },
  },
  { timestamps: true, versionKey: false }
);

// hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

export const User = model<IUser>("User", userSchema);
