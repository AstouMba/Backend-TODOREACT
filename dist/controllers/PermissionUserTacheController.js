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
import { ErrorsMessagesFr } from '../enum/ErrorsMessagesFr.js';
export class PermissionUserTacheController {
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
                const id = Number(req.params.id);
                const tache = yield TaskService.findById(id);
                const data = PermissionSchema.parse(req.body);
                const user = yield UserService.selectUserById(data.userId);
                if (user.id === tache.userId)
                    throw { status: HttpStatusCode.BAD_REQUEST, message: ErrorsMessagesFr.NOT_ON_Your_OWN_TASK };
                const permission = yield PermissionUserTacheService.findById(id, data.userId, data.permission.toUpperCase());
                if (permission)
                    throw { status: HttpStatusCode.BAD_REQUEST, message: ErrorsMessagesFr.ALREADY_GIVEN };
                const OMPermission = { permission: (data.permission).toUpperCase(), userId: data.userId, tacheId: id };
                const newPermission = yield PermissionUserTacheService.create(OMPermission);
                return ReponseFormatter.success(res, newPermission, SuccessCodes.PERMISSION_GRANTED);
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