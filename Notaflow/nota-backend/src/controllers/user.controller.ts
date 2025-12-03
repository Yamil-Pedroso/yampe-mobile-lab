import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const UserController = {
  async register(req: Request, res: Response) {
    try {
      const avatarBuffer = req.file ? req.file.buffer : null;

      const user = await UserService.register({
        ...req.body,
        avatarBuffer,
      });

      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.json(user);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  },

  async getUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.getUserById(id);
    res.json(user);
  },

  async getAll(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.json(users);
  },

  async logout(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const result = await UserService.logout(userId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  // ⭐ NUEVO: actualizar avatar
  async updateAvatar(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const file = req.file; // Multer pone el archivo aquí

      if (!file) {
        return res.status(400).json({ error: "No avatar uploaded" });
      }

      const updatedUser = await UserService.updateAvatar(userId, file);

      res.json({
        message: "Avatar updated successfully",
        user: updatedUser,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};
