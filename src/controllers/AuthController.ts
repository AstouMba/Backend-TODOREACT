import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import { UserService } from '../services/UserService.js';
import { HttpStatusCode } from '../enum/StatusCode.js';
import { JWTService } from '../services/JWTService.js';
import { ErrorsMessagesFr } from '../enum/ErrorsMessagesFr.js';
import { OMSecret_Key } from '../config/env.js';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        throw { status: HttpStatusCode.BAD_REQUEST, message: ErrorsMessagesFr.INVALID_INPUT };
      }

      const user = await UserService.selectUserByLogin(login);
      if (!user) {
        throw { status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.INCORRECT_CREDENTIALS };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw { status: HttpStatusCode.UNAUTHORIZED, message: ErrorsMessagesFr.INVALID_INPUT };

      const accessToken = JWTService.cryptData({ login: user.login, id: user.id }, OMSecret_Key, 7);
      const refreshToken = JWTService.cryptData({ login: user.login },OMSecret_Key);

res.json({ 
  token: accessToken, 
  refreshToken,
  user: { id: user.id, login: user.login } 
});
    } catch (error: any) {
      console.error("Login error:", error);

      const status = error?.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
      const message = error?.message || ErrorsMessagesFr.ERREUR_INTERNE;

      res.status(status).json({ error: message });
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "Token manquant" });

      const newAccessToken = await JWTService.refreshToken(token, OMSecret_Key);
      if (!newAccessToken) return res.status(401).json({ error: "Token invalide" });

      return res.json({ accessToken: newAccessToken });
    } catch (error: any) {
      console.error("Refresh token error:", error);
      const status = error?.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
      const message = error?.message || ErrorsMessagesFr.ERREUR_INTERNE;
      res.status(status).json({ error: message });
    }
  }
 static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password, nom } = req.body;

      if (!login || !password || !nom) {
        return res.status(HttpStatusCode.BAD_REQUEST)
                  .json({ error: "Tous les champs sont obligatoires" });
      }

      const exists = await UserService.userExists(login);
      if (exists) {
        return res.status(HttpStatusCode.BAD_REQUEST)
                  .json({ error: "Utilisateur déjà existant" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      
      const newUser = await UserService.createUser({
        login,
        password: hashedPassword,
        nom
      });

      res.status(HttpStatusCode.CREATED).json({
        user: { id: newUser.id, login: newUser.login, nom: newUser.nom }
      });

    } catch (error: any) {
      console.error("Register error:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
         .json({ error: "Erreur interne" });
    }
  }




}
