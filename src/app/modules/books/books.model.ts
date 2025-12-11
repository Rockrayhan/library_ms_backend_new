import { Document, model, Schema } from "mongoose";
import { IBook } from "./books.interface";

interface BookDocument extends IBook, Document {
  borrowBook(quantity: number): void;
}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    image_url: { type: String },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "ISLAMIC",
      ],
    },
    description: { type: String },

    in_stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Stock must be an integer",
      },
    },

    availableCopies: {
      type: Number,
      required: true,
      min: [0, "Available copies cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Available copies must be an integer",
      },
    },

    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// ================================
// INSTANCE METHOD
// ================================
bookSchema.methods.borrowBook = function (quantity: number) {
  if (this.availableCopies < quantity) {
    throw new Error("Not enough copies available");
  }

  this.availableCopies -= quantity;

  if (this.availableCopies === 0) {
    this.available = false;
  }
};

export const Book = model<BookDocument>("Book", bookSchema);
