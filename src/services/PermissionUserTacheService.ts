import AMprisma from "../config/prisma.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import type { Permission, PermissionUserTache } from "@prisma/client";

export class PermissionUserTacheService

{
  static async findAll() {
  return AMprisma.permissionUserTache.findMany({
    include: {
      user: { select: { id: true, login: true, nom: true } },
      tache: { select: { id: true, titre: true } }
    }
  });
}

  static async findByTaskId(tacheId: number) {
  return AMprisma.permissionUserTache.findMany({
    where: { tacheId },
    include: { user: true }, 
  });
}
 static async hasPermission(tacheId: number, userId: number, permission: Permission): Promise<boolean> {
    const perm = await AMprisma.permissionUserTache.findFirst({
      where: { tacheId, userId, permission }
    });
    return !!perm;
  }
  
    static async findById(tacheId: number, userId: number, permission: Permission): Promise<PermissionUserTache | null> {
        const AMPermission = await AMprisma.permissionUserTache.findFirst({ where: { userId, tacheId, permission } });
        return AMPermission;
    }

    static async create(data: Omit<PermissionUserTache, "id">): Promise<PermissionUserTache>{
        return await AMprisma.permissionUserTache.create({data})
    }

    static async delete(data: Omit<PermissionUserTache, "id">){
        const AMPermission = await AMprisma.permissionUserTache.findFirst({where: {userId: data.userId, permission: data.permission, tacheId: data.tacheId}})
        if (!AMPermission) throw {status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.PERMISSION_NOTFOUND}
        return await AMprisma.permissionUserTache.delete({where: {id: AMPermission.id}})
    }
}