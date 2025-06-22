import express, {
  Application,
  NextFunction,
  Request,
  response,
  Response,
} from "express";

import { bookRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management App");
});

// **?route not found handler ?**//

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ messeage: "Route not found" });
});

// global error handler
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
