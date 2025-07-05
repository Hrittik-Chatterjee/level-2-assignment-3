import { model, Schema } from "mongoose";
import { BookStaticMethods, IBooks } from "../interfaces/book.interface";

const bookSchema = new Schema<IBooks, BookStaticMethods>(
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
    picture: {
      type: String,
      required: [true, "Picture can not be empty"],
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
      required: [true, "Please provide number of copies"],
      min: [0, "Copies must be a positive number"],
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

//static method
bookSchema.static(
  "calculateCopies",
  function (currentCopies: number, borrowedCopies: number) {
    return currentCopies - borrowedCopies;
  }
);
// pre mid
bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

export const Book = model<IBooks, BookStaticMethods>("Book", bookSchema);
