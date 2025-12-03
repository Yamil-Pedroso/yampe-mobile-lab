import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import multer from "multer";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", upload.single("avatar"), UserController.register);

router.post("/login", UserController.login);

router.get("/", authMiddleware, UserController.getAll);
router.get("/:id", authMiddleware, UserController.getUser);
router.post("/logout", authMiddleware, UserController.logout);

router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  UserController.updateAvatar
);

export default router;
