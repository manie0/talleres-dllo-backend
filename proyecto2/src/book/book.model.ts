import { model, Schema } from "mongoose";

export type BookType = {
  title: string;
  author: string;
  genre?: string;
  publisher?: string;
  publishedDate?: Date;
  available: boolean;
  disabled?: boolean; // soft delete
};

const BookSchema = new Schema<BookType>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publisher: { type: String },
    publishedDate: { type: Date },
    available: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BookModel = model<BookType>("Book", BookSchema);
