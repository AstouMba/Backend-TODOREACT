import { Router } from "express";
import { HistoriqueModifTacheController } from "../controllers/HistoriqueModifTacheController.js";
const OMrouter = Router();
OMrouter.get("/", HistoriqueModifTacheController.getAll);
OMrouter.get("/:id/historique", HistoriqueModifTacheController.getAllModif);
export default OMrouter;
//# sourceMappingURL=HistoriqueModifTacheRoute.js.map