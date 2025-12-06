import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import notasRoutes from "./routes/notas";
import realNotasRoutes from "./routes/notas.routes";
import categoryRoutes from "./routes/categories.routes";
import tagsRoutes from "./routes/tags.routes";

import dotenv from "dotenv";
import cloudinary from "./config/cloudinary";

dotenv.config();
//dotenv.config({
//  path: path.resolve(process.cwd(), "src", "config", "config.env"),
//});

console.log("Cloudinary ready:", cloudinary.config().cloud_name);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notas", realNotasRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagsRoutes);

// Test route
app.use("/api/notas", notasRoutes);

export default app;
