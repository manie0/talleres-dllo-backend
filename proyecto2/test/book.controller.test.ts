/**
 * Pruebas para book.controller.ts
 */

import * as bookController from "../src/book/book.controller";

// Mock de acciones
jest.mock("../src/book/create.book.action", () => jest.fn());
jest.mock("../src/book/read.book.action", () => jest.fn());
jest.mock("../src/book/get.book.action", () => jest.fn());
jest.mock("../src/book/update.book.action", () => jest.fn());
jest.mock("../src/book/delete.book.action", () => jest.fn());

// Importar mocks
const createBookAction = require("../src/book/create.book.action");
const readBooksAction = require("../src/book/read.book.action");
const getBookAction = require("../src/book/get.book.action");
const updateBookAction = require("../src/book/update.book.action");
const deleteBookAction = require("../src/book/delete.book.action");

describe("book.controller", () => {
  afterEach(() => jest.resetAllMocks());

  // -----------------------------
  // CREATE BOOK
  // -----------------------------
  test("createBook success", async () => {
    createBookAction.mockResolvedValue({ title: "Libro X" });

    const res = await bookController.createBook({
      title: "Libro X",
      author: "Autor",
    });

    expect(res.title).toBe("Libro X");
  });

  test("createBook failure", async () => {
    createBookAction.mockRejectedValue(new Error("Datos inválidos"));

    await expect(bookController.createBook({})).rejects.toThrow(
      "Datos inválidos"
    );
  });

  // -----------------------------
  // READ BOOKS (paginación y filtros)
  // -----------------------------
  test("readBooks success", async () => {
    readBooksAction.mockResolvedValue({
      pagination: {
        page: 1,
        perPage: 10,
        total: 1,
        totalPages: 1,
      },
      books: [{ title: "Libro 1" }],
    });

    const res = await bookController.readBooks({});

    expect(res.pagination.page).toBe(1);
    expect(Array.isArray(res.books)).toBe(true);
    expect(res.books.length).toBe(1);
    expect(res.books[0].title).toBe("Libro 1");
  });

  test("readBooks failure", async () => {
    readBooksAction.mockRejectedValue(new Error("Error al leer libros"));

    await expect(bookController.readBooks({})).rejects.toThrow(
      "Error al leer libros"
    );
  });

  // -----------------------------
  // GET ONE BOOK
  // -----------------------------
  test("getBook success", async () => {
    getBookAction.mockResolvedValue({ title: "Mi Libro" });

    const res = await bookController.getBook("123");

    expect(res.title).toBe("Mi Libro");
  });

  test("getBook failure - invalid id", async () => {
    getBookAction.mockRejectedValue(new Error("Id inválido"));

    await expect(bookController.getBook("badid")).rejects.toThrow(
      "Id inválido"
    );
  });

  // -----------------------------
  // UPDATE BOOK
  // -----------------------------
  test("updateBook success", async () => {
    updateBookAction.mockResolvedValue({ title: "Editado" });

    const res = await bookController.updateBook("123", { title: "Editado" });

    expect(res.title).toBe("Editado");
  });

  test("updateBook failure", async () => {
    updateBookAction.mockRejectedValue(new Error("No se pudo actualizar"));

    await expect(bookController.updateBook("123", {})).rejects.toThrow(
      "No se pudo actualizar"
    );
  });

  // -----------------------------
  // DELETE BOOK
  // -----------------------------
  test("deleteBook success", async () => {
    deleteBookAction.mockResolvedValue(true);

    const res = await bookController.deleteBook("123");

    expect(res).toBeTruthy();
  });

  test("deleteBook failure", async () => {
    deleteBookAction.mockRejectedValue(new Error("No se pudo eliminar"));

    await expect(bookController.deleteBook("123")).rejects.toThrow(
      "No se pudo eliminar"
    );
  });
});
