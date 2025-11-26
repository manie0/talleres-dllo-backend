import * as bookController from "../src/book/book.controller";

jest.mock("../src/book/create.book.action", () => jest.fn());
jest.mock("../src/book/read.book.action", () => jest.fn());
jest.mock("../src/book/get.book.action", () => jest.fn());
jest.mock("../src/book/update.book.action", () => jest.fn());
jest.mock("../src/book/delete.book.action", () => jest.fn());

const createBookAction = require("../src/book/v1/create.book.action");
const readBooksAction = require("../src/book/v1/read.book.action");
const getBookAction = require("../src/book/v1/get.book.action");
const updateBookAction = require("../src/book/v1/update.book.action");
const deleteBookAction = require("../src/book/v1/delete.book.action");

describe("book.controller", () => {
  afterEach(() => jest.resetAllMocks());

  test("createBook success", async () => {
    createBookAction.mockResolvedValue({ _id: "b1", title: "Libro" });
    const res = await bookController.createBook({
      title: "Libro",
      author: "A",
    });
    expect(res.title).toBe("Libro");
  });

  test("readBooks success", async () => {
    readBooksAction.mockResolvedValue({ pagination: {}, books: [] });
    const res = await bookController.readBooks({});
    expect(res.books).toBeDefined();
  });

  test("getBook not found", async () => {
    getBookAction.mockRejectedValue(new Error("Libro no encontrado"));
    await expect(bookController.getBook("bad")).rejects.toThrow(
      "Libro no encontrado"
    );
  });

  test("updateBook success", async () => {
    updateBookAction.mockResolvedValue({ _id: "b1", title: "Updated" });
    const res = await bookController.updateBook("b1", { title: "Updated" });
    expect(res.title).toBe("Updated");
  });

  test("deleteBook success", async () => {
    deleteBookAction.mockResolvedValue(true);
    const res = await bookController.deleteBook("b1");
    expect(res).toBeTruthy();
  });
});
