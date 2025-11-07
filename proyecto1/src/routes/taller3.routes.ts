import { Router } from "express";
import {
  desglosarString,
  twoSum,
  conversionRomana,
  descomposicion,
} from "../controllers/taller3.controller";

const router = Router();

router.post("/desglosarString", desglosarString);
router.post("/twoSum", twoSum);
router.post("/conversionRomana", conversionRomana);
router.post("/descomposicion", descomposicion);

export default router;
