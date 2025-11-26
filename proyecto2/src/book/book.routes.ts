import { Router, Request, Response } from "express";
import { authUser } from "../middleware/authUser";
import { requireRole } from "../middleware/requireRole";
import {
  createBook,
  readBooks,
  getBook,
  updateBook,
  deleteBook,
} from "./book.controller";

const ReservationRouter = Router();

/**
 * GET LIST - público
 */
ReservationRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await readBooks(req.query);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * GET ONE - público
 */
ReservationRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const book = await getBook(req.params.id);
    res.json({ book });
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
});

/**
 * CREATE BOOK - solo admin
 */
ReservationRouter.post(
  "/",
  authUser,
  requireRole("admin"),
  async (req, res) => {
    try {
      const book = await createBook(req.body);
      res.status(201).json({ book });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
);

/**
 * UPDATE BOOK - solo admin
 */
ReservationRouter.put(
  "/:id",
  authUser,
  requireRole("admin"),
  async (req, res) => {
    try {
      const book = await updateBook(req.params.id, req.body);
      res.json({ book });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
);

/**
 * DELETE BOOK - solo admin
 */
ReservationRouter.delete(
  "/:id",
  authUser,
  requireRole("admin"),
  async (req, res) => {
    try {
      await deleteBook(req.params.id);
      res.json({ message: "Libro inhabilitado" });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
);

export default ReservationRouter;
