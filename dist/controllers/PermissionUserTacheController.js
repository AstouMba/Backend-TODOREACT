var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PermissionUserTacheService } from "../services/PermissionUserTacheService.js";
import { PermissionSchema } from '../models/PermissionModel.js';
import { ReponseFormatter } from '../middlewaares/ReponseFormatter.js';
import { SuccessCodes } from '../enum/SuccesCodesFr.js';
import { TaskService } from '../services/TaskService.js';
import { UserService } from '../services/UserService.js';
import { HttpStatusCode } from '../enum/StatusCode.js';
export class PermissionUserTacheController {
    static getAllGlobal(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const permissions = yield PermissionUserTacheService.findAll();
                return ReponseFormatter.success(res, permissions, SuccessCodes.PERMISSION_GRANTED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tacheId = Number(req.params.id);
                const permissions = yield PermissionUserTacheService.findByTaskId(tacheId);
                return ReponseFormatter.success(res, permissions, SuccessCodes.PERMISSION_GRANTED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tacheId = Number(req.params.id);
                const tache = yield TaskService.findById(tacheId);
                // Parse le body : { userId: number, permission: 'GET' | 'PATCH' | 'DELETE' }
                const { userId, permission } = PermissionSchema.parse(req.body);
                if (!userId) {
                    throw { status: HttpStatusCode.BAD_REQUEST, message: "Aucun utilisateur sélectionné" };
                }
                const user = yield UserService.selectUserById(userId);
                if (user.id === tache.userId) {
                    // Ignorer l'utilisateur propriétaire de la tâche
                    return ReponseFormatter.success(res, [], SuccessCodes.PERMISSION_GRANTED);
                }
                const existingPermission = yield PermissionUserTacheService.findById(tacheId, userId, permission.toUpperCase());
                if (existingPermission) {
                    // Ignorer les permissions déjà accordées
                    return ReponseFormatter.success(res, [], SuccessCodes.PERMISSION_GRANTED);
                }
                const newPermission = yield PermissionUserTacheService.create({
                    permission: permission.toUpperCase(),
                    userId,
                    tacheId,
                });
                return ReponseFormatter.success(res, [newPermission], SuccessCodes.PERMISSION_GRANTED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = Number(req.params.userId);
                const permission = (_a = req.params.permission) === null || _a === void 0 ? void 0 : _a.toUpperCase();
                const tacheId = Number(req.params.tacheId);
                yield PermissionUserTacheService.delete({ userId, permission, tacheId });
                return ReponseFormatter.success(res, null, SuccessCodes.PERMISSION_REMOVED);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
//# sourceMappingURL=PermissionUserTacheController.js.map