var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HistoriqueModifTacheService } from "../services/HistoriqueModifTacheService.js";
import { ReponseFormatter } from '../middlewaares/ReponseFormatter.js';
import { SuccessCodes } from '../enum/SuccesCodesFr.js';
export class HistoriqueModifTacheController {
    // static async create(req: Request, res: Response, next: NextFunction){
    //     try {
    //         const tacheId = Number(req.params.id)
    //         const userId = Number (req.user?.id)
    //         const newModification = await HistoriqueModifTacheService.create({userId, tacheId})
    //         return ReponseFormatter.success(res, newModification, SuccessCodes.Task_UPDATED)
    //     } catch (err) {
    //         next(err)
    //     }
    // }
    static getAllModif(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tacheId = Number(req.params.id);
                const allModification = yield HistoriqueModifTacheService.findModificationByTacheId(tacheId);
                let data = [];
                allModification.forEach(modification => {
                    const modif = {
                        author: modification.user.nom,
                        dateCreation: new Date(modification.taches.createAt).toLocaleString("fr-FR"),
                        dateModif: new Date(modification.modifiedAt).toLocaleString("fr-FR"),
                        action: modification.action === "PATCH" ? "Modification" : modification.action === "GET" ? "Lecture" : "Suppression"
                    };
                    data.push(modif);
                });
                return ReponseFormatter.success(res, data, SuccessCodes.Task_ALL_FETCHED);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
//# sourceMappingURL=HistoriqueModifTacheController.js.map