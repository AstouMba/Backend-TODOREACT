import { Router } from "express";
import { PermissionUserTacheController } from "../controllers/PermissionUserTacheController.js";
import { AuthMiddleware } from "../middlewaares/AuthMiddleware.js";
const OMrouter = Router();
OMrouter.get("/:id/permissions", AuthMiddleware.authenticateUser, PermissionUserTacheController.getAll);
OMrouter.post("/:id", PermissionUserTacheController.create);
OMrouter.delete("/:userId/:tacheId/:permission", PermissionUserTacheController.delete);
export default OMrouter;
//# sourceMappingURL=permissionRoute.js.map