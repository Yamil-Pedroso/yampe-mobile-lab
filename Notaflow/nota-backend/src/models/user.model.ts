import { pool } from "../config/db";

export const UserModel = {
  async create(user: any) {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, is_logout, avatar)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, created_at, is_logout, avatar`,
      [user.name, user.email, user.password_hash, user.is_logout, user.avatar]
    );
    return result.rows[0];
  },

  async findByEmail(email: string) {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  },

  async findById(id: number) {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query(
      `SELECT id, name, email, avatar FROM users`
    );
    return result.rows;
  },

  async setLogoutState(id: number, state: boolean) {
    const result = await pool.query(
      `UPDATE users
       SET is_logout = $1
       WHERE id = $2
       RETURNING id, email, is_logout`,
      [state, id]
    );
    return result.rows[0];
  },

  async updateAvatar(userId: number, avatarUrl: string) {
    const result = await pool.query(
      `UPDATE users
       SET avatar = $1
       WHERE id = $2
       RETURNING id, name, email, avatar`,
      [avatarUrl, userId]
    );

    return result.rows[0];
  },
};
