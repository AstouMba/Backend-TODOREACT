import express, { Router } from "express";
import { TaskController } from "../controllers/TaskController.js";
import { AuthMiddleware } from "../middlewaares/AuthMiddleware.js";
import { HistoriqueModifTacheController } from "../controllers/HistoriqueModifTacheController.js";

const OMrouter = Router();

// Routes lecture
OMrouter.get("/", TaskController.getAll);
OMrouter.get("/:id", TaskController.getOne);
OMrouter.get("/:id/historique", HistoriqueModifTacheController.getAllModif);

// Création – on reçoit seulement JSON avec l'URL de l'image
OMrouter.post("/", AuthMiddleware.authenticateUser, TaskController.create);

// Modification / suppression
OMrouter.patch("/:id", AuthMiddleware.authorizeModification, TaskController.update);
OMrouter.patch("/:id/markDone", AuthMiddleware.authorizeModification, TaskController.updateStatusDone);
OMrouter.patch("/:id/markUndone", AuthMiddleware.authorizeModification, TaskController.updateStatusUndone);
OMrouter.delete("/:id", AuthMiddleware.authorizeModification, TaskController.delete);

export default OMrouter;
