import OMprisma from "../config/prisma.js";
import type {HistoriqueModifTache} from "../../node_modules/.prisma/client/index.js"
import type { IService } from "../Interface/IServices.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import { Request } from "express";
import { Permission } from "@prisma/client";

export class HistoriqueModifTacheService

{
    static async findAll() {
  return OMprisma.historiqueModifTache.findMany({
    include: {
      user: { select: { id: true, nom: true, login: true } },
      taches: { select: { id: true, titre: true, createAt: true } }
    },
    orderBy: { modifiedAt: "desc" }
  });
}

    static async create(data: Omit<HistoriqueModifTache, "id" | "modifiedAt" | "action">, req: Request): Promise<HistoriqueModifTache> {
        return await OMprisma.historiqueModifTache.create({data:{
            action: (req.method).toUpperCase() as Permission,
            user: { connect: { id: data.userId } } ,
            taches: { connect: { id: data.tacheId } } 
        }})
    }

    static async findModificationByTacheId(id: number) {
        const OMtask = await OMprisma.historiqueModifTache.findMany({ 
            where: { tacheId: id },
            select:{modifiedAt: true, action: true, taches: {select:{createAt: true}}, user: {select:{nom: true}}},
            // include: {taches: {select:{createAt: true}}, user: {select:{nom: true}}},
        });
        if (!OMtask) throw {status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE}
        return OMtask;
    }
}