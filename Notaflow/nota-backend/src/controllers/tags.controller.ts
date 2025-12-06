import { Request, Response } from "express";
import { TagsService } from "../services/tags.service";

export const TagsController = {
  async getAll(req: Request, res: Response) {
    const tagsQuantity: number = await TagsService.getAllTags().then(
      (tags) => tags.length
    );
    const tags = await TagsService.getAllTags();
    return res.json({ tagsQuantity, tags });
  },

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const tag = await TagsService.getTag(id);
    return res.json(tag);
  },

  async create(req: Request, res: Response) {
    try {
      const tag = await TagsService.createTag(req.body);
      return res.status(201).json(tag);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const tag = await TagsService.updateTag(id, req.body);
      return res.json(tag);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await TagsService.deleteTag(id);
      return res.json({ message: "Tag deleted" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};
