import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller";

const router = Router();

router.get("/", CategoriesController.getAll);
router.get("/:id", CategoriesController.getOne);
router.post("/", CategoriesController.create);
router.put("/:id", CategoriesController.update);
router.delete("/:id", CategoriesController.delete);

export default router;
