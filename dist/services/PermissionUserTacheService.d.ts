import type { Permission, PermissionUserTache } from "@prisma/client";
export declare class PermissionUserTacheService {
    static findAll(): Promise<({
        tache: {
            id: number;
            titre: string;
        };
        user: {
            id: number;
            nom: string;
            login: string;
        };
    } & {
        id: number;
        permission: import("@prisma/client").$Enums.Permission;
        userId: number;
        tacheId: number;
    })[]>;
    static findByTaskId(tacheId: number): Promise<({
        user: {
            id: number;
            nom: string;
            login: string;
            password: string;
        };
    } & {
        id: number;
        permission: import("@prisma/client").$Enums.Permission;
        userId: number;
        tacheId: number;
    })[]>;
    static findById(tacheId: number, userId: number, permission: Permission): Promise<PermissionUserTache | null>;
    static create(data: Omit<PermissionUserTache, "id">): Promise<PermissionUserTache>;
    static delete(data: Omit<PermissionUserTache, "id">): Promise<{
        id: number;
        permission: import("@prisma/client").$Enums.Permission;
        userId: number;
        tacheId: number;
    }>;
}
//# sourceMappingURL=PermissionUserTacheService.d.ts.map