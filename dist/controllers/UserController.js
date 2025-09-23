var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserService } from "../services/UserService.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
export class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserService.getAllUsers();
                const safeUsers = users.map(u => ({ id: u.id, login: u.login, nom: u.nom }));
                res.status(HttpStatusCode.OK).json(safeUsers);
            }
            catch (err) {
                console.error(err);
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erreur serveur' });
            }
        });
    }
}
//# sourceMappingURL=UserController.js.map