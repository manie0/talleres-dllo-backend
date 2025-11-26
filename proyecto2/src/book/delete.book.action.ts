import { BookModel } from "./book.model";

async function deleteBookAction(id: string) {
  const book = await BookModel.findById(id);
  if (!book) throw new Error("Libro no encontrado");
  book.disabled = true;
  await book.save();
  return true;
}

export default deleteBookAction;
