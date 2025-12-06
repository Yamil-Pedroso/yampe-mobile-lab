import { CategoriesModel } from "../models/categories.model";

export const CategoriesService = {
  async getAllCategories() {
    return await CategoriesModel.getAll();
  },

  async getCategory(id: number) {
    return await CategoriesModel.getById(id);
  },

  async createCategory(data: any) {
    return await CategoriesModel.create(data.name);
  },

  async updateCategory(id: number, data: any) {
    return await CategoriesModel.update(id, data.name);
  },

  async deleteCategory(id: number) {
    return await CategoriesModel.delete(id);
  },
};
