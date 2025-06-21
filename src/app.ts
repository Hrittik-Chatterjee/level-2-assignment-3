import express, { Application, NextFunction, Request, Response } from "express";

import { bookRoutes } from "./app/controllers/books.controller";

const app: Application = express();

app.use(express.json());

app.use("/api/books", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

//   if (error.name === "ValidationError") {
//     res.status(400).json({
//       message: error.message,
//       success: false,
//       error,
//     });
//   } else if (error.code === "Duplicate key error") {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//       error,
//     });
//   } else if (error?.issues[0]?.code === "invalid_type") {
//     res.status(400).json({
//       messeage: "Invalid input type",
//       success: false,
//       error,
//     });
//   } else {
//     res.status(404).json({
//       messeage: "something went wrong",
//     });
//   }
// });

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name === "ValidationError") {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  } else if (error?.issues?.[0]?.code === "invalid_type") {
    res.status(400).json({
      message: "Invalid input type",
      success: false,
      error,
    });
  } else if (error.message === "Duplicate ISBN key detected") {
    res.status(400).json({
      success: false,
      message: "Duplicate key error",
      error: {
        name: error.name,
        message: error.message,
      },
    });
  } else {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
});

export default app;
