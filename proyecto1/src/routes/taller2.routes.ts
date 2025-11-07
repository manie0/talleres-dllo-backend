import { Router } from "express";
import {
  findMax,
  includesNumber,
  sum,
  missingNumbers,
} from "../controllers/taller2.controller";

const router = Router();

// Todos los endpoints son POST
router.post("/findMax", findMax);
router.post("/includes", includesNumber);
router.post("/sum", sum);
router.post("/missingNumbers", missingNumbers);

export default router;
