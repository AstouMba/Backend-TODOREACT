import express, { Request, Response } from "express";
import cors from 'cors';
import path from 'path';
import TaskRoutes from "./routes/TaskRoutes.js";
import { ErrorController } from "./middlewaares/ErrorController.js";
import AuthRoutes from './routes/authRoutes.js';
import PermissionRoutes from './routes/permissionRoute.js';
import HistoriqueModifTacheRoute from './routes/HistoriqueModifTacheRoute.js';
import UserRoutes from './routes/UserRoutes.js';
import { AuthMiddleware } from "./middlewaares/AuthMiddleware.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(process.cwd(), "uploads");

const OMapp = express();

OMapp.use(express.json());

OMapp.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET','POST','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,              
}));

OMapp.get('/', (req: Request, res: Response) => {
  res.send('API BA TAKNA ZEULÉEEEE....');
});
OMapp.use("/api/auth", AuthRoutes);

OMapp.use(AuthMiddleware.authenticateUser);

OMapp.use('/uploads', express.static(uploadPath));
OMapp.use('/api/tasks', TaskRoutes);
OMapp.use('/api/grantpermission', PermissionRoutes);
OMapp.use('/api/historique', HistoriqueModifTacheRoute);

OMapp.use('/api/users', UserRoutes)


export default OMapp;
