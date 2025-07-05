import { Types } from "mongoose";

export interface IBorrows {
  book: Types.ObjectId;
  picture: string;
  quantity: number;
  dueDate: Date;
}
