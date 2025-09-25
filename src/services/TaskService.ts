import AMprisma from "../config/prisma.js";
import type {Taches, HistoriqueModifTache} from "../../node_modules/.prisma/client/index.js"
import type { IService } from "../Interface/IServices.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import { Permission } from "@prisma/client";
import { Request } from "express";

export class TaskService
{
    static async findAll(offset: number, limit: number, search: string, sortBy: string, order: string): Promise<Taches[]> {
        return await AMprisma.taches.findMany({
            skip: offset,
            take: limit,
            where: search ? {
                OR: [
                    { titre: { contains: search } },
                    { description: { contains: search } }
                ]
            } : {},
            orderBy: {
                [sortBy]: order
            }
        });
    }

    static async count(): Promise<number> {
        return await AMprisma.taches.count();
    }

    static async countFiltered(search: string): Promise<number> {
        return await AMprisma.taches.count({
            where: search ? {
                OR: [
                    { titre: { contains: search } },
                    { description: { contains: search } }
                ]
            } : {}
        });
    }

    static async findById(id: number): Promise<Taches> {
        const AMtask = await AMprisma.taches.findUnique({ where: { id } });
        if (!AMtask) throw {status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE}
        return AMtask;
    }
static async create(data: Omit<Taches, "id" | "createAt" | "modifiedAt" | "etat">): Promise<Taches> {
    return await AMprisma.taches.create({
        data: {
            titre: data.titre, 
            description: data.description,
            image: data.image,
            audio: data.audio,
            user: { connect: { id: data.userId } }
        }
    })
}

    static async update(id: number, data: Partial<Taches>, userId: number, req: Request): Promise<[Taches, HistoriqueModifTache]> {
        const AMtask = await AMprisma.taches.findUnique({ where: { id } });
        if (!AMtask) throw {status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE};
        const [taches, log] = await AMprisma.$transaction([
            AMprisma.taches.update({where: {id}, data}),
            AMprisma.historiqueModifTache.create({data:{
            action: (req.method).toUpperCase() as Permission,
            user: { connect: { id: userId } } ,
            taches: { connect: { id } } 
        }})
            
        ])
        return [taches, log]
    }
  static async delete(id: number): Promise<void> {
  const task = await AMprisma.taches.findUnique({ where: { id } });
  if (!task) throw { status: 404, message: "Tâche introuvable" };

  await AMprisma.$transaction([

    AMprisma.permissionUserTache.deleteMany({ where: { tacheId: id } }),

    AMprisma.historiqueModifTache.deleteMany({ where: { tacheId: id } }),

    AMprisma.taches.delete({ where: { id } }),
  ]);
}
}

const TypedUserService: IService<Taches, HistoriqueModifTache> = TaskService;
