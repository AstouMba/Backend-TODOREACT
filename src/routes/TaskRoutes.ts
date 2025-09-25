import express, { Router } from "express";
import { TaskController } from "../controllers/TaskController.js";
import { AuthMiddleware } from "../middlewaares/AuthMiddleware.js";
import { imageUpload } from "../middlewaares/imageUpload.js";
import { audioUpload } from "../middlewaares/audioUpload.js";
import { multiUpload } from "../middlewaares/multiUpload.js";

const AMrouter = Router();

AMrouter.get("/", TaskController.getAll);
AMrouter.get("/:id", TaskController.getOne);

AMrouter.post("/", AuthMiddleware.authenticateUser, multiUpload, TaskController.create);

AMrouter.patch("/:id", AuthMiddleware.authenticateUser, multiUpload, TaskController.update);

AMrouter.patch("/:id/markDone", AuthMiddleware.authenticateUser, TaskController.updateStatusDone);
AMrouter.patch("/:id/markUndone", AuthMiddleware.authenticateUser, TaskController.updateStatusUndone);
AMrouter.delete("/:id", AuthMiddleware.authenticateUser, TaskController.delete);

export default AMrouter;
