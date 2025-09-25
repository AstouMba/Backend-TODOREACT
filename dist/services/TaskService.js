var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AMprisma from "../config/prisma.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
export class TaskService {
    static findAll(offset, limit, search, sortBy, order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AMprisma.taches.findMany({
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
            return yield AMprisma.taches.count();
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const AMtask = yield AMprisma.taches.findUnique({ where: { id } });
            if (!AMtask)
                throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE };
            return AMtask;
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AMprisma.taches.create({
                data: {
                    titre: data.titre,
                    description: data.description,
                    image: data.image,
                    audio: data.audio,
                    user: { connect: { id: data.userId } }
                }
            });
        });
    }
    static update(id, data, userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const AMtask = yield AMprisma.taches.findUnique({ where: { id } });
            if (!AMtask)
                throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE };
            const [taches, log] = yield AMprisma.$transaction([
                AMprisma.taches.update({ where: { id }, data }),
                AMprisma.historiqueModifTache.create({ data: {
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
            const task = yield AMprisma.taches.findUnique({ where: { id } });
            if (!task)
                throw { status: 404, message: "Tâche introuvable" };
            yield AMprisma.$transaction([
                AMprisma.permissionUserTache.deleteMany({ where: { tacheId: id } }),
                AMprisma.historiqueModifTache.deleteMany({ where: { tacheId: id } }),
                AMprisma.taches.delete({ where: { id } }),
            ]);
        });
    }
}
const TypedUserService = TaskService;
//# sourceMappingURL=TaskService.js.map