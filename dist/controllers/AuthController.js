var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import { UserService } from '../services/UserService.js';
import { HttpStatusCode } from '../enum/StatusCode.js';
import { JWTService } from '../services/JWTService.js';
import { ErrorsMessagesFr } from '../enum/ErrorsMessagesFr.js';
import { OMSecret_Key } from '../config/env.js';
export class AuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                if (!login || !password) {
                    throw { status: HttpStatusCode.BAD_REQUEST, message: ErrorsMessagesFr.INVALID_INPUT };
                }
                const user = yield UserService.selectUserByLogin(login);
                if (!user) {
                    throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.INCORRECT_CREDENTIALS };
                }
                const isMatch = yield bcrypt.compare(password, user.password);
                if (!isMatch)
                    throw { status: HttpStatusCode.UNAUTHORIZED, message: ErrorsMessagesFr.INVALID_INPUT };
                const accessToken = JWTService.cryptData({ login: user.login, id: user.id }, OMSecret_Key, 7);
                const refreshToken = JWTService.cryptData({ login: user.login }, OMSecret_Key);
                res.json({
                    token: accessToken,
                    refreshToken,
                    user: { id: user.id, login: user.login }
                });
            }
            catch (error) {
                console.error("Login error:", error);
                const status = (error === null || error === void 0 ? void 0 : error.status) || HttpStatusCode.INTERNAL_SERVER_ERROR;
                const message = (error === null || error === void 0 ? void 0 : error.message) || ErrorsMessagesFr.ERREUR_INTERNE;
                res.status(status).json({ error: message });
            }
        });
    }
    static refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers["authorization"];
                const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
                if (!token)
                    return res.status(401).json({ error: "Token manquant" });
                const newAccessToken = yield JWTService.refreshToken(token, OMSecret_Key);
                if (!newAccessToken)
                    return res.status(401).json({ error: "Token invalide" });
                return res.json({ accessToken: newAccessToken });
            }
            catch (error) {
                console.error("Refresh token error:", error);
                const status = (error === null || error === void 0 ? void 0 : error.status) || HttpStatusCode.INTERNAL_SERVER_ERROR;
                const message = (error === null || error === void 0 ? void 0 : error.message) || ErrorsMessagesFr.ERREUR_INTERNE;
                res.status(status).json({ error: message });
            }
        });
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password, nom } = req.body;
                if (!login || !password || !nom) {
                    return res.status(HttpStatusCode.BAD_REQUEST)
                        .json({ error: "Tous les champs sont obligatoires" });
                }
                const exists = yield UserService.userExists(login);
                if (exists) {
                    return res.status(HttpStatusCode.BAD_REQUEST)
                        .json({ error: "Utilisateur déjà existant" });
                }
                const hashedPassword = yield bcrypt.hash(password, 10);
                const newUser = yield UserService.createUser({
                    login,
                    password: hashedPassword,
                    nom
                });
                res.status(HttpStatusCode.CREATED).json({
                    user: { id: newUser.id, login: newUser.login, nom: newUser.nom }
                });
            }
            catch (error) {
                console.error("Register error:", error);
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                    .json({ error: "Erreur interne" });
            }
        });
    }
}
//# sourceMappingURL=AuthController.js.map