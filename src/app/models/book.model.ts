import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/book.interface";

const bookSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
      required: [true, "Book title can not be empty"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author can not be empty"],
    },
    genre: {
      type: String,
      required: [true, "Please provide a valid genre"],
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "Please provide an ISBN key"],
      unique: [true, "Duplicate ISBN key detected"],
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "PLease provide number of copies"],
      min: [1, "Copies must be positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBooks>("Book", bookSchema);
