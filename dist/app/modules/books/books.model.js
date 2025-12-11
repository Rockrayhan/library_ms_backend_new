"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, { timestamps: true, versionKey: false });
// ================================
// INSTANCE METHOD
// ================================
bookSchema.methods.borrowBook = function (quantity) {
    if (this.availableCopies < quantity) {
        throw new Error("Not enough copies available");
    }
    this.availableCopies -= quantity;
    if (this.availableCopies === 0) {
        this.available = false;
    }
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
