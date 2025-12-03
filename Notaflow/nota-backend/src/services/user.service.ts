import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { CONFIG } from "../config";
import { uploadBufferToCloudinary } from "../utils/cloudinary-upload";

export const UserService = {
  // REGISTER (con avatar opcional)
  async register(data: any) {
    const existing = await UserModel.findByEmail(data.email);
    if (existing) throw new Error("Email already registered");

    const hashed = await bcrypt.hash(data.password, 10);

    let avatarUrl = null;

    if (data.avatarBuffer) {
      const uploadResult = await uploadBufferToCloudinary(data.avatarBuffer, {
        folder: `notaflow/avatars`,
        public_id: `avatar_${Date.now()}`,
        overwrite: true,
      });
      avatarUrl = uploadResult.secure_url;
    }

    const userToCreate = {
      name: data.name,
      email: data.email,
      password_hash: hashed,
      is_logout: false,
      avatar: avatarUrl,
    };

    const user = await UserModel.create(userToCreate);

    const token = jwt.sign(
      { id: user.id, email: user.email, is_logout: false },
      CONFIG.jwt.secret,
      { expiresIn: CONFIG.jwt.expiresIn }
    );

    return { user, token };
  },

  // LOGIN
  async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error("Invalid password");

    await UserModel.setLogoutState(user.id, false);

    const token = jwt.sign(
      { id: user.id, email: user.email, is_logout: false },
      CONFIG.jwt.secret,
      { expiresIn: CONFIG.jwt.expiresIn }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        is_logout: false,
      },
      token,
    };
  },

  // GET USER BY ID
  async getUserById(id: number) {
    return await UserModel.findById(id);
  },

  // GET ALL USERS
  async getAllUsers() {
    return await UserModel.getAll();
  },

  // LOGOUT
  async logout(userId: number) {
    await UserModel.setLogoutState(userId, true);
    return { message: "Logout successful" };
  },

  // ⭐ NUEVO: actualizar avatar
  async updateAvatar(userId: number, file: Express.Multer.File) {
    if (!file) throw new Error("No avatar provided");

    // 1. Subir a cloudinary
    const uploadResult = await uploadBufferToCloudinary(file.buffer, {
      folder: `notaflow/avatars`,
      public_id: `avatar_${Date.now()}`,
      overwrite: true,
    });
    const avatarUrl = uploadResult.secure_url;

    // 2. Guardarlo en BD
    const updatedUser = await UserModel.updateAvatar(userId, avatarUrl);

    return updatedUser;
  },
};
