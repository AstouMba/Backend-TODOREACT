import { UserController } from "../controllers/UserController.js";
import express, { Router } from "express";

const AMrouter = Router();

AMrouter.get("/", UserController.getAllUsers);

export default AMrouter;
