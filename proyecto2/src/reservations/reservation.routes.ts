import { Router, Request, Response } from "express";
import { authUser } from "../middleware/authUser";
import { requireRole } from "../middleware/requireRole";

import {
  createReservation,
  deliverReservation,
  getBookReservations,
  getUserReservations,
} from "./reservation.controller";

const router = Router();

/**
 * CREATE RESERVATION
 * cualquier usuario autenticado
 */
router.post("/", authUser, async (req: Request, res: Response) => {
  try {
    const data = {
      userId: req.user!._id.toString(),
      bookId: req.body.bookId,
    };

    const reservation = await createReservation(data);
    res.status(201).json({ reservation });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * DELIVER RESERVATION
 * solo admin
 */
router.put("/deliver/:id", authUser, requireRole("admin"), async (req, res) => {
  try {
    const reservation = await deliverReservation(req.params.id);
    res.json({ reservation });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * GET HISTORY BY BOOK
 * solo admin
 */
router.get("/book/:id", authUser, requireRole("admin"), async (req, res) => {
  try {
    const reservations = await getBookReservations(req.params.id);
    res.json({ reservations });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * GET HISTORY BY USER
 * admin o el propio usuario
 */
router.get("/user/:id", authUser, async (req, res) => {
  try {
    const requester = req.user!;
    const id = req.params.id;

    const isSelf = requester._id.toString() === id;
    const isAdmin = requester.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const reservations = await getUserReservations(id);
    res.json({ reservations });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
