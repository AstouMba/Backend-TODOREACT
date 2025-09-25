import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import TaskRoutes from "./routes/TaskRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import PermissionRoutes from "./routes/permissionRoute.js";
import HistoriqueModifTacheRoute from "./routes/HistoriqueModifTacheRoute.js";
import UserRoutes from "./routes/UserRoutes.js";
import { AuthMiddleware } from "./middlewaares/AuthMiddleware.js";
import audioRoutes from "./routes/audiosRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AMapp = express();

AMapp.use(express.json({ type: 'application/json', limit: '10mb' }));

AMapp.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

AMapp.get("/", (req: Request, res: Response) => {
  res.send("API BA TAKNA ZEULÉEEEE....");
});

AMapp.use("/api/auth", AuthRoutes);
AMapp.use("/uploads", express.static(path.join(process.cwd(), "/uploads/images")));

AMapp.use(AuthMiddleware.authenticateUser);

AMapp.use("/api/users", UserRoutes);
AMapp.use("/uploads/audios", express.static(path.join(process.cwd(), "/uploads/audios")));
AMapp.use("/api/audios", audioRoutes);
AMapp.use("/api/tasks", TaskRoutes);
AMapp.use("/api/grantpermission", PermissionRoutes);
AMapp.use("/api/historique", HistoriqueModifTacheRoute);

export default AMapp;
