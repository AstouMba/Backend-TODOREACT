import { UserController } from "../controllers/UserController.js";
import { Router } from "express";
const OMrouter = Router();
OMrouter.get("/users", UserController.getAllUsers);
export default OMrouter;
//# sourceMappingURL=UserRoutes.js.map