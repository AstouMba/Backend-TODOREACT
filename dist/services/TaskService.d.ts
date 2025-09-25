import type { Taches, HistoriqueModifTache } from "../../node_modules/.prisma/client/index.js";
import { Request } from "express";
export declare class TaskService {
    static findAll(offset: number, limit: number, search: string, sortBy: string, order: string): Promise<Taches[]>;
    static count(): Promise<number>;
    static countFiltered(search: string): Promise<number>;
    static findById(id: number): Promise<Taches>;
    static create(data: Omit<Taches, "id" | "createAt" | "modifiedAt" | "etat">): Promise<Taches>;
    static update(id: number, data: Partial<Taches>, userId: number, req: Request): Promise<[Taches, HistoriqueModifTache]>;
    static delete(id: number): Promise<void>;
}
//# sourceMappingURL=TaskService.d.ts.map