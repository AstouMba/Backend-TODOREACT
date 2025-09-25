var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JWTService } from "../services/JWTService.js";
import { TaskService } from "../services/TaskService.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import { PermissionUserTacheService } from "../services/PermissionUserTacheService.js";
import { AMSecret_Key } from "../config/env.js";
// export const SECRET_KEY = "ma_clef_secrete";
export class AuthMiddleware {
    static authenticateUser(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)
            return res.status(401).json({ error: "Token manquant" });
        try {
            const decoded = JWTService.decryptToken(token, AMSecret_Key);
            if (typeof decoded === "object" && decoded !== null && "login" in decoded) {
                req.user = decoded;
            }
            else {
                return res.status(403).json({ error: "Token invalide" });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    }
    static authorizeModification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = Number(req.params.id);
                const AMtask = yield TaskService.findById(id);
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === AMtask.userId) {
                    return next();
                }
                return AuthMiddleware.authorizePermission(req, res, next);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static authorizePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = Number(req.params.id);
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const method = req.method;
                const AMPermission = yield PermissionUserTacheService.findById(id, userId, method);
                if (!AMPermission)
                    throw { status: HttpStatusCode.FORBIDDEN, message: ErrorsMessagesFr.FORBIDDEN_ACTION };
                next();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
//# sourceMappingURL=AuthMiddleware.js.map