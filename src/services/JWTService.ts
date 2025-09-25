import jwt from 'jsonwebtoken'
import { TaskService } from './TaskService.js';
import { AMSecret_Key } from '../config/env.js';
import { Response } from 'express';
import { UserService } from './UserService.js';
import { log } from 'console';

export class JWTService
{
    static cryptData(data: Record<string, unknown>, secretKey: string, validityTime?: number) {
        const option: jwt.SignOptions = {}
        if (validityTime) option.expiresIn = `${validityTime}h`;
        return jwt.sign(data, secretKey, option);
    }

    static decryptToken(token: string, AMSecret_Key: string,){
        console.log(AMSecret_Key);
        
        return jwt.verify(token, AMSecret_Key);
    }

    static async refreshToken(token: string, secretKey: string){
        const decoded = this.decryptToken(token, secretKey);
        if(decoded){
            const payload = decoded as { login: string };
            const user = await UserService.selectUserByLogin(payload.login);
            if(!user) return null;
            return  this.cryptData({login: user.login, id: user.id}, AMSecret_Key, 1);
        }
        return null;
    }
}