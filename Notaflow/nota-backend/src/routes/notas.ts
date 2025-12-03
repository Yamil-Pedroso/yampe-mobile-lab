import { Router } from "express";
import { getNotas } from "../controllers/notas.controller.js";

const router = Router();

router.get("/", getNotas);

export default router;
