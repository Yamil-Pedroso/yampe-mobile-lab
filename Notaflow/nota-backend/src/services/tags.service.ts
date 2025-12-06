import { TagsModel } from "../models/tags.model";

export const TagsService = {
  async getAllTags() {
    return await TagsModel.getAll();
  },

  async getTag(id: number) {
    return await TagsModel.getById(id);
  },

  async createTag(data: any) {
    return await TagsModel.create(data.name);
  },

  async updateTag(id: number, data: any) {
    return await TagsModel.update(id, data.name);
  },

  async deleteTag(id: number) {
    return await TagsModel.delete(id);
  },
};
