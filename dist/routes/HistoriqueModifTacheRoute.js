import { Router } from "express";
import { PermissionUserTacheController } from "../controllers/PermissionUserTacheController.js";
import { HistoriqueModifTacheController } from "../controllers/HistoriqueModifTacheController.js";
const OMrouter = Router();
OMrouter.get("/:id/historique", HistoriqueModifTacheController.getAllModif);
OMrouter.delete("/:userId/:tacheId/:permission", PermissionUserTacheController.delete);
export default OMrouter;
//# sourceMappingURL=HistoriqueModifTacheRoute.js.map