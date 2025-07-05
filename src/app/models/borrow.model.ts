import { model, Schema } from "mongoose";
import { IBorrows } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrows>(
  {
    book: {
      type: Schema.Types.ObjectId,
      required: [true, "Book Id can not be empty"],
      ref: "Book",
    },

    quantity: {
      type: Number,
      required: [true, "quantity must be given"],
      min: [1, "quantity cant be negetive"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please provide due date"],
    },
  },
  {
    timestamps: true,
  }
);

export const Borrow = model<IBorrows>("Borrow", borrowSchema);
