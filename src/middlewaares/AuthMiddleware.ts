import { Request, Response, NextFunction } from "express";
import { JWTService } from "../services/JWTService.js";
import { TaskService } from "../services/TaskService.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import { PermissionUserTacheService } from "../services/PermissionUserTacheService.js";
import { Permission } from "@prisma/client";
import { AMSecret_Key } from "../config/env.js";

// export const SECRET_KEY = "ma_clef_secrete";
export class AuthMiddleware {
    static authenticateUser(req: Request, res: Response, next: NextFunction) {
        // Permettre les requêtes OPTIONS pour CORS preflight
        if (req.method === 'OPTIONS') {
            return next();
        }

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ error: "Token manquant" });
        }
        
        try {
            const decoded = JWTService.decryptToken(token, AMSecret_Key);
            if (typeof decoded === "object" && decoded !== null && "login" in decoded) {
                req.user = decoded as { login: string; id: string };
            } else {
                return res.status(403).json({ error: "Token invalide" });
            }
            next();
        } catch (err) {
            next(err);
        }
    }

    static async authorizeModification(req: Request, res: Response, next: NextFunction) {
        // Permettre les requêtes OPTIONS
        if (req.method === 'OPTIONS') {
            return next();
        }

        try {
            const id = Number(req.params.id);
            const AMtask = await TaskService.findById(id);
            if (req.user?.id === AMtask.userId) {
                return next();
            }
            return AuthMiddleware.authorizePermission(req, res, next);
        } catch (err) {
            next(err);
        }
    }

    static async authorizePermission(req: Request, res: Response, next: NextFunction) {
        // Permettre les requêtes OPTIONS
        if (req.method === 'OPTIONS') {
            return next();
        }

        try {
            const id = Number(req.params.id);
            const userId = req.user?.id;
            const method = req.method as Permission;

            const AMPermission = await PermissionUserTacheService.findById(id, userId, method);
            if (!AMPermission) {
                throw { 
                    status: HttpStatusCode.FORBIDDEN, 
                    message: ErrorsMessagesFr.FORBIDDEN_ACTION 
                };
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}