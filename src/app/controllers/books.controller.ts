import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { z } from "zod";

export const bookRoutes = express.Router();

const addBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean().optional(),
});

bookRoutes.post("/", async (req: Request, res: Response) => {
  const body = await addBookZodSchema.parseAsync(req.body);
  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

bookRoutes.get("/", async (req: Request, res: Response) => {
  const books = await Book.find();
  res.status(201).json({
    success: true,
    message: "Book get successfuly",
    books,
  });
});

bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch books",
      error,
    });
  }
});

// bookRoutes.get('/:noteId', async (req: Request, res: Response) => {
//     const noteId = req.params.noteId
//     const note = await Note.findById(noteId)

//     res.status(201).json({
//         success: true,
//         message: "Note created successfuly",
//         note
//     })
// })
// bookRoutes.delete('/:noteId', async (req: Request, res: Response) => {
//     const noteId = req.params.noteId
//     const note = await Note.findByIdAndDelete(noteId)
//     // const note1 = await Note.findOneAndDelete({ _id: noteId })
//     // const note2 = await Note.deleteOne({ _id: noteId })

//     res.status(201).json({
//         success: true,
//         message: "Note updated successfuly",
//         note
//     })
// })
// bookRoutes.patch('/:noteId', async (req: Request, res: Response) => {
//     const noteId = req.params.noteId
//     const updatedBody = req.body;
//     const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true, })
//     // const note = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, { new: true, })
//     // const note = await Note.updateOne({ _id: noteId }, updatedBody, { new: true, })

//     res.status(201).json({
//         success: true,
//         message: "Note updated successfuly",
//         note
//     })
// })
