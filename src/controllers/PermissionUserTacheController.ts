import { Request, Response, NextFunction } from 'express';
import { PermissionUserTacheService } from "../services/PermissionUserTacheService.js";
import { PermissionSchema } from '../models/PermissionModel.js';
import { Permission } from '@prisma/client';
import { ReponseFormatter } from '../middlewaares/ReponseFormatter.js';
import { SuccessCodes } from '../enum/SuccesCodesFr.js';
import { TaskService } from '../services/TaskService.js';
import { UserService } from '../services/UserService.js';
import { HttpStatusCode } from '../enum/StatusCode.js';
import { ErrorsMessagesFr } from '../enum/ErrorsMessagesFr.js';

export class PermissionUserTacheController

{
    static async getAllGlobal(req: Request, res: Response, next: NextFunction) {
  try {
    const permissions = await PermissionUserTacheService.findAll(); 
    return ReponseFormatter.success(res, permissions, SuccessCodes.PERMISSION_GRANTED);
  } catch (err) {
    next(err);
  }
}

    static async getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const tacheId = Number(req.params.id);
    const permissions = await PermissionUserTacheService.findByTaskId(tacheId);
    return ReponseFormatter.success(res, permissions, SuccessCodes.PERMISSION_GRANTED);
  } catch (err) {
    next(err);
  }
}

    static async create(req: Request, res: Response, next: NextFunction) {
  try {
    const tacheId = Number(req.params.id);
    const tache = await TaskService.findById(tacheId);

    // Parse le body : { userId: number, permission: 'GET' | 'PATCH' | 'DELETE' }
    const { userId, permission } = PermissionSchema.parse(req.body);

    if (!userId) {
      throw { status: HttpStatusCode.BAD_REQUEST, message: "Aucun utilisateur sélectionné" };
    }

    const user = await UserService.selectUserById(userId);

    if (user.id === tache.userId) {
      // Ignorer l'utilisateur propriétaire de la tâche
      return ReponseFormatter.success(
        res,
        [],
        SuccessCodes.PERMISSION_GRANTED
      );
    }

    const existingPermission = await PermissionUserTacheService.findById(
      tacheId,
      userId,
      permission.toUpperCase() as Permission
    );

    if (existingPermission) {
      // Ignorer les permissions déjà accordées
      return ReponseFormatter.success(
        res,
        [],
        SuccessCodes.PERMISSION_GRANTED
      );
    }

    const newPermission = await PermissionUserTacheService.create({
      permission: permission.toUpperCase() as Permission,
      userId,
      tacheId,
    });

    return ReponseFormatter.success(
      res,
      [newPermission],
      SuccessCodes.PERMISSION_GRANTED
    );
  } catch (err) {
    next(err);
  }
}

    static async delete(req: Request, res: Response, next: NextFunction){
        try {
            const userId = Number (req.params.userId)
            const permission = req.params.permission?.toUpperCase() as Permission
            const tacheId = Number (req.params.tacheId)
            await PermissionUserTacheService.delete({userId, permission, tacheId})
            return ReponseFormatter.success(res, null, SuccessCodes.PERMISSION_REMOVED)      
        } catch (err) {
            next(err)
        }
    }
}