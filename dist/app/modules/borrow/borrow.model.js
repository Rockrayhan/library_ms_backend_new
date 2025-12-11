"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
// borrow.model.ts
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date },
    returned: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
