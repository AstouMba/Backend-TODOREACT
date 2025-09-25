import { UserController } from "../controllers/UserController.js";
import { Router } from "express";
const AMrouter = Router();
AMrouter.get("/", UserController.getAllUsers);
export default AMrouter;
//# sourceMappingURL=UserRoutes.js.map