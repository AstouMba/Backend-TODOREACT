import { Router } from "express";
import { HistoriqueModifTacheController } from "../controllers/HistoriqueModifTacheController.js";
const AMrouter = Router();
AMrouter.get("/", HistoriqueModifTacheController.getAll);
AMrouter.get("/:id/historique", HistoriqueModifTacheController.getAllModif);
export default AMrouter;
//# sourceMappingURL=HistoriqueModifTacheRoute.js.map