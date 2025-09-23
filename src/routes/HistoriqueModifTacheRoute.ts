import express, { Router } from "express";
import { PermissionUserTacheController } from "../controllers/PermissionUserTacheController.js";
import { AuthMiddleware } from "../middlewaares/AuthMiddleware.js";
import { HistoriqueModifTacheController } from "../controllers/HistoriqueModifTacheController.js";

const OMrouter = Router();

OMrouter.get("/", HistoriqueModifTacheController.getAll);
OMrouter.get("/:id/historique",  HistoriqueModifTacheController.getAllModif);
OMrouter.delete("/:userId/:tacheId/:permission",  PermissionUserTacheController.delete);

export default OMrouter