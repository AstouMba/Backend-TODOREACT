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
export class PermissionUserTacheService {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return AMprisma.permissionUserTache.findMany({
                include: {
                    user: { select: { id: true, login: true, nom: true } },
                    tache: { select: { id: true, titre: true } }
                }
            });
        });
    }
    static findByTaskId(tacheId) {
        return __awaiter(this, void 0, void 0, function* () {
            return AMprisma.permissionUserTache.findMany({
                where: { tacheId },
                include: { user: true },
            });
        });
    }
    static hasPermission(tacheId, userId, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            const perm = yield AMprisma.permissionUserTache.findFirst({
                where: { tacheId, userId, permission }
            });
            return !!perm;
        });
    }
    static findById(tacheId, userId, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            const AMPermission = yield AMprisma.permissionUserTache.findFirst({ where: { userId, tacheId, permission } });
            return AMPermission;
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AMprisma.permissionUserTache.create({ data });
        });
    }
    static delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const AMPermission = yield AMprisma.permissionUserTache.findFirst({ where: { userId: data.userId, permission: data.permission, tacheId: data.tacheId } });
            if (!AMPermission)
                throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.PERMISSION_NOTFOUND };
            return yield AMprisma.permissionUserTache.delete({ where: { id: AMPermission.id } });
        });
    }
}
//# sourceMappingURL=PermissionUserTacheService.js.map