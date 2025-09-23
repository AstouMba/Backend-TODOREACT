import OMprisma from "../config/prisma.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import type { Permission, PermissionUserTache } from "@prisma/client";

export class PermissionUserTacheService

{
  static async findAll() {
  return OMprisma.permissionUserTache.findMany({
    include: {
      user: { select: { id: true, login: true, nom: true } },
      tache: { select: { id: true, titre: true } }
    }
  });
}

  static async findByTaskId(tacheId: number) {
  return OMprisma.permissionUserTache.findMany({
    where: { tacheId },
    include: { user: true }, 
  });
}
  
    static async findById(tacheId: number, userId: number, permission: Permission): Promise<PermissionUserTache | null> {
        const OMPermission = await OMprisma.permissionUserTache.findFirst({ where: { userId, tacheId, permission } });
        return OMPermission;
    }

    static async create(data: Omit<PermissionUserTache, "id">): Promise<PermissionUserTache>{
        return await OMprisma.permissionUserTache.create({data})
    }

    static async delete(data: Omit<PermissionUserTache, "id">){
        const OMPermission = await OMprisma.permissionUserTache.findFirst({where: {userId: data.userId, permission: data.permission, tacheId: data.tacheId}})
        if (!OMPermission) throw {status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.PERMISSION_NOTFOUND}
        return await OMprisma.permissionUserTache.delete({where: {id: OMPermission.id}})
    }
}