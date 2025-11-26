import { Router, Request, Response } from "express";
import {
  register,
  login,
  readUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./user.controller";
import { authUser } from "../middleware/authUser";
import { requireRole } from "../middleware/requireRole";

const router = Router();

/**
 * REGISTRO
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.status(201).json({
      message: "User created",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * LOGIN
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
});

/**
 * OBTENER LISTA DE USUARIOS
 * Solo admin puede hacerlo
 */
router.get("/", authUser, requireRole("admin"), async (req, res) => {
  try {
    const users = await readUsers();
    res.json({ message: "Success", users });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * OBTENER USUARIO POR ID
 * Un usuario normal solo puede verse a sí mismo
 * Un admin puede ver a cualquiera
 */
router.get("/:id", authUser, async (req, res) => {
  try {
    const requester = req.user!;
    const id = req.params.id;

    const isSelf = requester._id.toString() === id;
    const isAdmin = requester.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const user = await getUser(id);
    res.json({ message: "Success", user });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * ACTUALIZAR USUARIO
 * Puede hacerlo:
 *  - el administrador
 *  - el mismo usuario
 */
router.put("/:id", authUser, async (req, res) => {
  try {
    const requester = req.user!;
    const id = req.params.id;

    const isSelf = requester._id.toString() === id;
    const isAdmin = requester.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const updated = await updateUser(id, req.body);
    res.json({ message: "Updated", updated });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * ELIMINAR/DESACTIVAR USUARIO
 * Puede hacerlo:
 *  - el administrador
 *  - el mismo usuario
 */
router.delete("/:id", authUser, async (req, res) => {
  try {
    const requester = req.user!;
    const id = req.params.id;

    const isSelf = requester._id.toString() === id;
    const isAdmin = requester.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await deleteUser(id);
    res.json({ message: "User disabled" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});
export default router;
