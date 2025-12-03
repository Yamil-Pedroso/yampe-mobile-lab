import { NotasModel } from "../models/notas.model";

export const NotasService = {
  async getAllNotas() {
    return await NotasModel.getAll();
  },
  async getUserNotas(userId: number, includeArchived = false) {
    return await NotasModel.getAllByUser(userId, includeArchived);
  },

  async getNota(id: number) {
    return await NotasModel.getById(id);
  },

  async createNota(data: any) {
    return await NotasModel.create(data);
  },

  async updateNota(id: number, data: any) {
    return await NotasModel.update(id, data);
  },

  async deleteNota(id: number) {
    return await NotasModel.delete(id);
  },

  async toggleFavorite(id: number) {
    return await NotasModel.toggleFavorite(id);
  },

  async toggleArchive(id: number) {
    return await NotasModel.toggleArchive(id);
  },
};
