import { Router } from "express";
import {
  convertidorTemp,
  resolvedor,
  mejorParidad,
  peorParidad,
} from "../controllers/taller1.controller";

const router = Router();

router.post("/convertidorTemp", convertidorTemp);
router.post("/resolvedor", resolvedor);
router.post("/mejorParidad", mejorParidad);
router.post("/peorParidad", peorParidad);

export default router;
