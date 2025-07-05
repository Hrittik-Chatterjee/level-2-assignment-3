import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { z } from "zod";

export const bookRoutes = express.Router();

const addBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  picture: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean().optional(),
});

// Add new book
bookRoutes.post("/", async (req: Request, res: Response) => {
  const body = await addBookZodSchema.parseAsync(req.body);
  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

//get all books
bookRoutes.get("/", async (req: Request, res: Response) => {
  const filterByGenre = req.query.filter
    ? (req.query.filter as string).toUpperCase()
    : undefined;

  const query = filterByGenre ? { genre: filterByGenre } : {};

  const books = await Book.find(query).sort({ _id: -1 });

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

// get single book
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);

  res.status(201).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

//delete book
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findByIdAndDelete(bookId);

  res.status(201).json({
    success: true,
    message: "Book deleted successfully",
    book,
  });
});
// update book
bookRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBody = req.body;
  const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "Book updated successfully",
    book,
  });
});
