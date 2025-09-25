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
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
export class UserService {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return AMprisma.user.findMany();
        });
    }
    static selectUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AMprisma.user.findUnique({
                where: { login }
            });
            if (!user)
                throw { status: HttpStatusCode.BAD_REQUEST, message: ErrorsMessagesFr.INCORRECT_CREDENTIALS };
            return user;
        });
    }
    static selectUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AMprisma.user.findUnique({
                where: { id }
            });
            if (!user)
                throw { status: HttpStatusCode.BAD_REQUEST, message: ErrorsMessagesFr.USER_NOT_FOUND };
            return user;
        });
    } // { id: "permissions", label: "Permissions", icon: Shield },
    static userExists(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AMprisma.user.findUnique({ where: { login } });
            return !!user;
        });
    }
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return AMprisma.user.create({
                data: {
                    login: data.login,
                    password: data.password,
                    nom: data.nom
                },
            });
        });
    }
}
//# sourceMappingURL=UserService.js.map