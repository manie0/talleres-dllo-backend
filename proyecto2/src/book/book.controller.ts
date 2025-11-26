import createBookAction from "./create.book.action";
import readBooksAction from "./read.book.action";
import getBookAction from "./get.book.action";
import updateBookAction from "./update.book.action";
import deleteBookAction from "./delete.book.action";

async function createBook(data: any) {
  return await createBookAction(data);
}
async function readBooks(query: any) {
  return await readBooksAction(query);
}
async function getBook(id: string) {
  return await getBookAction(id);
}
async function updateBook(id: string, data: any) {
  return await updateBookAction(id, data);
}
async function deleteBook(id: string) {
  return await deleteBookAction(id);
}

export { createBook, readBooks, getBook, updateBook, deleteBook };
