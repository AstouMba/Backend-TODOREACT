var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { OMSecret_Key } from '../config/env.js';
import { UserService } from './UserService.js';
export class JWTService {
    static cryptData(data, secretKey, validityTime) {
        const option = {};
        if (validityTime)
            option.expiresIn = `${validityTime}h`;
        return jwt.sign(data, secretKey, option);
    }
    static decryptToken(token, OMSecret_Key) {
        console.log(OMSecret_Key);
        return jwt.verify(token, OMSecret_Key);
    }
    static refreshToken(token, secretKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = this.decryptToken(token, secretKey);
            if (decoded) {
                const payload = decoded;
                const user = yield UserService.selectUserByLogin(payload.login);
                if (!user)
                    return null;
                return this.cryptData({ login: user.login, id: user.id }, OMSecret_Key, 1);
            }
            return null;
        });
    }
}
//# sourceMappingURL=JWTService.js.map