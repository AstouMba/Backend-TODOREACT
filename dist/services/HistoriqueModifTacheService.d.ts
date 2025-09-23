import type { HistoriqueModifTache } from "../../node_modules/.prisma/client/index.js";
import { Request } from "express";
export declare class HistoriqueModifTacheService {
    static findAll(): Promise<({
        taches: {
            id: number;
            titre: string;
            createAt: Date;
        };
        user: {
            id: number;
            nom: string;
            login: string;
        };
    } & {
        id: number;
        modifiedAt: Date;
        action: import("@prisma/client").$Enums.Permission;
        userId: number;
        tacheId: number;
    })[]>;
    static create(data: Omit<HistoriqueModifTache, "id" | "modifiedAt" | "action">, req: Request): Promise<HistoriqueModifTache>;
    static findModificationByTacheId(id: number): Promise<{
        modifiedAt: Date;
        action: import("@prisma/client").$Enums.Permission;
        taches: {
            createAt: Date;
        };
        user: {
            nom: string;
        };
    }[]>;
}
//# sourceMappingURL=HistoriqueModifTacheService.d.ts.map