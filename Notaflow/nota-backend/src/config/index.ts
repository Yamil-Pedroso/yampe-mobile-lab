import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(process.cwd(), "src", "config", "config.env"),
});

export const CONFIG = {
  port: process.env.PORT || 3010,

  db: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT!),
  },

  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: (process.env.JWT_EXPIRES || "7d") as string,
  },
};
