import type { HistoriqueModifTache } from "../../node_modules/.prisma/client/index.js";
import { Request } from "express";
export declare class HistoriqueModifTacheService {
    static findAll(): Promise<({
        taches: {
            id: number;
            createAt: Date;
            titre: string;
        };
        user: {
            id: number;
            login: string;
            nom: string;
        };
    } & {
        id: number;
        modifiedAt: Date;
        userId: number;
        action: import("@prisma/client").$Enums.Permission;
        tacheId: number;
    })[]>;
    static create(data: Omit<HistoriqueModifTache, "id" | "modifiedAt" | "action">, req: Request): Promise<HistoriqueModifTache>;
    static findModificationByTacheId(id: number): Promise<{
        modifiedAt: Date;
        taches: {
            createAt: Date;
        };
        user: {
            nom: string;
        };
        action: import("@prisma/client").$Enums.Permission;
    }[]>;
}
//# sourceMappingURL=HistoriqueModifTacheService.d.ts.map