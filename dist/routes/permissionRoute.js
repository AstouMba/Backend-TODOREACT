import { Router } from "express";
import { PermissionUserTacheController } from "../controllers/PermissionUserTacheController.js";
import { AuthMiddleware } from "../middlewaares/AuthMiddleware.js";
const AMrouter = Router();
AMrouter.get("/", PermissionUserTacheController.getAllGlobal);
AMrouter.get("/:id/permissions", AuthMiddleware.authenticateUser, PermissionUserTacheController.getAll);
AMrouter.post("/:id", PermissionUserTacheController.create);
AMrouter.delete("/:userId/:tacheId/:permission", PermissionUserTacheController.delete);
export default AMrouter;
//# sourceMappingURL=permissionRoute.js.map