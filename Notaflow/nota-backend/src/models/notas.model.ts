import { pool } from "../config/db";

export const NotasModel = {
  async getAll() {
    const result = await pool.query(
      `SELECT * FROM notas ORDER BY created_at DESC`
    );
    return result.rows;
  },
  async getAllByUser(userId: number, includeArchived = false) {
    const query = `
      SELECT *
      FROM notas
      WHERE user_id = $1
      ${includeArchived ? "" : "AND is_archived = false"}
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async getById(id: number) {
    const result = await pool.query(`SELECT * FROM notas WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async create(data: any) {
    const query = `
      INSERT INTO notas
        (user_id, category_id, title, content, color_hex, is_favorite, is_archived)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      data.user_id,
      data.category_id,
      data.title,
      data.content,
      data.color_hex,
      data.is_favorite ?? false,
      data.is_archived ?? false,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async update(id: number, data: any) {
    const query = `
      UPDATE notas
      SET
        title = $1,
        content = $2,
        color_hex = $3,
        category_id = $4,
        is_favorite = $5,
        is_archived = $6,
        updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `;

    const values = [
      data.title,
      data.content,
      data.color_hex,
      data.category_id,
      data.is_favorite,
      data.is_archived,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(id: number) {
    await pool.query(`DELETE FROM notas WHERE id = $1`, [id]);
    return true;
  },

  async toggleFavorite(id: number) {
    const result = await pool.query(
      `
      UPDATE notas
      SET is_favorite = NOT is_favorite,
          updated_at = NOW()
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return result.rows[0];
  },

  async toggleArchive(id: number) {
    const result = await pool.query(
      `
      UPDATE notas
      SET is_archived = NOT is_archived,
          updated_at = NOW()
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return result.rows[0];
  },
};
