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
export class PermissionUserTacheService {
    static findByTaskId(tacheId) {
        return __awaiter(this, void 0, void 0, function* () {
            return OMprisma.permissionUserTache.findMany({
                where: { tacheId },
                include: { user: true },
            });
        });
    }
    static findById(tacheId, userId, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            const OMPermission = yield OMprisma.permissionUserTache.findFirst({ where: { userId, tacheId, permission } });
            return OMPermission;
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield OMprisma.permissionUserTache.create({ data });
        });
    }
    static delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const OMPermission = yield OMprisma.permissionUserTache.findFirst({ where: { userId: data.userId, permission: data.permission, tacheId: data.tacheId } });
            if (!OMPermission)
                throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.PERMISSION_NOTFOUND };
            return yield OMprisma.permissionUserTache.delete({ where: { id: OMPermission.id } });
        });
    }
}
//# sourceMappingURL=PermissionUserTacheService.js.map