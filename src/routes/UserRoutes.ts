import { UserController } from "../controllers/UserController.js";
import express, { Router } from "express";
const OMrouter = Router();

OMrouter.get("/users", UserController.getAllUsers);
export default OMrouter;
