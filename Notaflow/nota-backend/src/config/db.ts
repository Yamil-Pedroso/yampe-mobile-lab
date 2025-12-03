import pkg from "pg";
import { CONFIG } from "./index";
const { Pool } = pkg;

export const pool = new Pool({
  host: CONFIG.db.host,
  user: CONFIG.db.user,
  password: CONFIG.db.password,
  database: CONFIG.db.name,
  port: CONFIG.db.port,
});
