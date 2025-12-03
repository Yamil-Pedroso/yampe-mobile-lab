import dotenv from "dotenv";
import ms from "ms";
import path from "path";
dotenv.config();
//dotenv.config({
//  path: path.resolve(process.cwd(), "src", "config", "config.env"),
//});

if (!process.env.JWT_SECRET) {
  throw new Error("Missing required environment variable: JWT_SECRET");
}

export const CONFIG = {
  port: process.env.PORT || 4000,

  db: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT!),
  },

  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: ((process.env.JWT_EXPIRES as ms.StringValue) ||
      "7d") as ms.StringValue,
  },
};
