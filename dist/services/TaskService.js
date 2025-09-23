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
export class TaskService {
    static findAll(offset, limit, search, sortBy, order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OMprisma.taches.findMany({
                skip: offset,
                take: limit,
                where: {
                    OR: [
                        { description: { contains: search } },
                        // {createAt: {equals: search}}
                    ]
                },
                orderBy: {
                    [sortBy]: order
                }
            });
        });
    }
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OMprisma.taches.count();
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const OMtask = yield OMprisma.taches.findUnique({ where: { id } });
            if (!OMtask)
                throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE };
            return OMtask;
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OMprisma.taches.create({
                data: {
                    titre: data.titre,
                    description: data.description,
                    image: data.image,
                    user: { connect: { id: data.userId } }
                }
            });
        });
    }
    static update(id, data, userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const OMtask = yield OMprisma.taches.findUnique({ where: { id } });
            if (!OMtask)
                throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE };
            const [taches, log] = yield OMprisma.$transaction([
                OMprisma.taches.update({ where: { id }, data }),
                OMprisma.historiqueModifTache.create({ data: {
                        action: (req.method).toUpperCase(),
                        user: { connect: { id: userId } },
                        taches: { connect: { id } }
                    } })
            ]);
            return [taches, log];
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const OMtask = yield OMprisma.taches.findUnique({ where: { id } });
            if (!OMtask)
                throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE };
            yield OMprisma.taches.delete({ where: { id } });
        });
    }
}
const TypedUserService = TaskService;
//# sourceMappingURL=TaskService.js.map