import type { Request, Response } from "express";
import { pool } from "../config/db";
import type { AuthRequest } from "../middlewares/auth.middleware";

// Mock implementation for testing purposes
export const getNotas = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM notas ORDER BY id DESC");

    return res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching notes",
    });
  }
};

// Real implementation of NotasController using NotasService
import { NotasService } from "../services/notas.service";

export const NotasController = {
  async getAllNotas(req: Request, res: Response) {
    const notas = await NotasService.getAllNotas();
    return res.json(notas);
  },
  async getNotas(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const includeArchived = req.query.archived === "true";

    const notas = await NotasService.getUserNotas(userId, includeArchived);
    return res.json(notas);
  },

  async getNota(req: Request, res: Response) {
    const id = Number(req.params.id);
    const nota = await NotasService.getNota(id);
    return res.json(nota);
  },

  async createNota(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id; // <-- Usuario autenticado

      const nota = await NotasService.createNota({
        ...req.body,
        user_id: userId, // <-- Aquí se establece automáticamente
      });

      return res.status(201).json(nota);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async updateNota(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const nota = await NotasService.updateNota(id, req.body);
      return res.json(nota);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async deleteNota(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await NotasService.deleteNota(id);
      return res.json({ message: "Nota deleted" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async toggleFavorite(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const nota = await NotasService.toggleFavorite(id);
      return res.json(nota);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async toggleArchive(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const nota = await NotasService.toggleArchive(id);
      return res.json(nota);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};
