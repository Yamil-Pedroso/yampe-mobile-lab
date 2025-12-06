import { pool } from "../config/db";

export const TagsModel = {
  async getAll() {
    const result = await pool.query(`SELECT * FROM tags ORDER BY id ASC`);
    return result.rows;
  },

  async getById(id: number) {
    const result = await pool.query(`SELECT * FROM tags WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async create(name: string) {
    const result = await pool.query(
      `INSERT INTO tags (name)
       VALUES ($1)
       RETURNING *`,
      [name]
    );
    return result.rows[0];
  },

  async update(id: number, name: string) {
    const result = await pool.query(
      `UPDATE tags
       SET name = $1
       WHERE id = $2
       RETURNING *`,
      [name, id]
    );
    return result.rows[0];
  },

  async delete(id: number) {
    await pool.query(`DELETE FROM tags WHERE id = $1`, [id]);
    return true;
  },
};
