import express, { Router } from "express";
import { PermissionUserTacheController } from "../controllers/PermissionUserTacheController.js";
import { AuthMiddleware } from "../middlewaares/AuthMiddleware.js";
import { HistoriqueModifTacheController } from "../controllers/HistoriqueModifTacheController.js";

const AMrouter = Router();

AMrouter.get("/", HistoriqueModifTacheController.getAll);
AMrouter.get("/:id/historique",  HistoriqueModifTacheController.getAllModif);

export default AMrouter
