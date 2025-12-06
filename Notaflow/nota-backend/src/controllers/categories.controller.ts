import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";

export const CategoriesController = {
  async getAll(req: Request, res: Response) {
    const categories = await CategoriesService.getAllCategories();
    return res.json(categories);
  },

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const category = await CategoriesService.getCategory(id);
    return res.json(category);
  },

  async create(req: Request, res: Response) {
    try {
      const category = await CategoriesService.createCategory(req.body);
      return res.status(201).json(category);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const category = await CategoriesService.updateCategory(id, req.body);
      return res.json(category);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await CategoriesService.deleteCategory(id);
      return res.json({ message: "Category deleted" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};
