var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OMprisma from "../config/prisma.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
export class HistoriqueModifTacheService {
    static create(data, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OMprisma.historiqueModifTache.create({ data: {
                    action: (req.method).toUpperCase(),
                    user: { connect: { id: data.userId } },
                    taches: { connect: { id: data.tacheId } }
                } });
        });
    }
    static findModificationByTacheId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const OMtask = yield OMprisma.historiqueModifTache.findMany({
                where: { tacheId: id },
                select: { modifiedAt: true, action: true, taches: { select: { createAt: true } }, user: { select: { nom: true } } },
                // include: {taches: {select:{createAt: true}}, user: {select:{nom: true}}},
            });
            if (!OMtask)
                throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE };
            return OMtask;
        });
    }
}
//# sourceMappingURL=HistoriqueModifTacheService.js.map