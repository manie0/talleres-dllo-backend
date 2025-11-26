import { BookModel } from "./book.model";

async function updateBookAction(id: string, data: any) {
  const book = await BookModel.findById(id);
  if (!book) throw new Error("Libro no encontrado");
  Object.assign(book, data);
  await book.save();
  return book.toObject();
}

export default updateBookAction;
