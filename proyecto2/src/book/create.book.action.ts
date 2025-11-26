import { BookModel, BookType } from "./book.model";

type CreateInput = Partial<BookType> & { title: string; author: string };

async function createBookAction(data: CreateInput) {
  const b = new BookModel(data);
  await b.save();
  return b.toObject();
}

export default createBookAction;
