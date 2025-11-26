import { BookModel } from "./book.model";
import { Types } from "mongoose";

async function getBookAction(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new Error("Id inválido");
  const book = await BookModel.findOne({ _id: id, disabled: false });
  if (!book) throw new Error("Libro no encontrado");
  return book;
}

export default getBookAction;
