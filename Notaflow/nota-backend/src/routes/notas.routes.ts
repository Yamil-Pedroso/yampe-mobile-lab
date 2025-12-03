import { Router } from "express";
import { NotasController } from "../controllers/notas.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", NotasController.getAllNotas);
router.get("/user/:userId", NotasController.getNotas);
router.get("/:id", NotasController.getNota);
router.post("/", authMiddleware, NotasController.createNota);
router.put("/:id", NotasController.updateNota);
router.delete("/:id", NotasController.deleteNota);

router.patch("/:id/favorite", NotasController.toggleFavorite);
router.patch("/:id/archive", NotasController.toggleArchive);

export default router;
