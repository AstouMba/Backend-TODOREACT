import OMprisma from "../config/prisma.js";
import type {Taches, HistoriqueModifTache} from "../../node_modules/.prisma/client/index.js"
import type { IService } from "../Interface/IServices.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import { Permission } from "@prisma/client";
import { Request } from "express";

export class TaskService
{
    static async findAll(offset: number, limit: number, search: string, sortBy: string, order: string): Promise<Taches[]> {
        return await OMprisma.taches.findMany({
            skip: offset,
            take: limit,
            where: {
                OR:[
                {description: {contains: search}},
                // {createAt: {equals: search}}
                ]
            },
            orderBy: {
                [sortBy]: order
            }
        });
    }

    static async count(): Promise<number> {
    return await OMprisma.taches.count();
    }

    static async findById(id: number): Promise<Taches> {
        const OMtask = await OMprisma.taches.findUnique({ where: { id } });
        if (!OMtask) throw {status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE}
        return OMtask;
    }
static async create(data: Omit<Taches, "id" | "createAt" | "modifiedAt" | "etat">): Promise<Taches> {
    return await OMprisma.taches.create({
        data: {
            titre: data.titre, 
            description: data.description,
            image: data.image,
            user: { connect: { id: data.userId } }
        }
    })
}

    static async update(id: number, data: Partial<Taches>, userId: number, req: Request): Promise<[Taches, HistoriqueModifTache]> {
        const OMtask = await OMprisma.taches.findUnique({ where: { id } });
        if (!OMtask) throw {status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE};
        const [taches, log] = await OMprisma.$transaction([
            OMprisma.taches.update({where: {id}, data}),
            OMprisma.historiqueModifTache.create({data:{
            action: (req.method).toUpperCase() as Permission,
            user: { connect: { id: userId } } ,
            taches: { connect: { id } } 
        }})
            
        ])
        return [taches, log]
    }
    static async delete(id: number): Promise<void> {
        const OMtask = await OMprisma.taches.findUnique({ where: { id } });
        if (!OMtask) throw {status: HttpStatusCode.NOT_FOUND, message: ErrorsMessagesFr.TACHE_INTROUVABLE};
        await OMprisma.taches.delete({where: {id}})
    }
}

const TypedUserService: IService<Taches, HistoriqueModifTache> = TaskService;
