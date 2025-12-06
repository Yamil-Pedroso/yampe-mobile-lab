import { Router } from "express";
import { TagsController } from "../controllers/tags.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAdminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

// Public
router.get("/", TagsController.getAll);
router.get("/:id", TagsController.getOne);

// Protected
router.post("/", authMiddleware, isAdminMiddleware, TagsController.create);
router.put("/:id", authMiddleware, isAdminMiddleware, TagsController.update);
router.delete("/:id", authMiddleware, isAdminMiddleware, TagsController.delete);

export default router;
