import jwt from 'jsonwebtoken'
import { TaskService } from './TaskService.js';
import { OMSecret_Key } from '../config/env.js';
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

    static decryptToken(token: string, OMSecret_Key: string,){
        console.log(OMSecret_Key);
        
        return jwt.verify(token, OMSecret_Key);
    }

    static async refreshToken(token: string, secretKey: string){
        const decoded = this.decryptToken(token, secretKey);
        if(decoded){
            const payload = decoded as { login: string };
            const user = await UserService.selectUserByLogin(payload.login);
            if(!user) return null;
            return  this.cryptData({login: user.login, id: user.id}, OMSecret_Key, 1);
        }
        return null;
    }
}