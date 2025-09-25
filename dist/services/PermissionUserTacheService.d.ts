import type { Permission, PermissionUserTache } from "@prisma/client";
export declare class PermissionUserTacheService {
    static findAll(): Promise<({
        user: {
            id: number;
            login: string;
            nom: string;
        };
        tache: {
            id: number;
            titre: string;
        };
    } & {
        id: number;
        userId: number;
        tacheId: number;
        permission: import("@prisma/client").$Enums.Permission;
    })[]>;
    static findByTaskId(tacheId: number): Promise<({
        user: {
            id: number;
            login: string;
            nom: string;
            password: string;
        };
    } & {
        id: number;
        userId: number;
        tacheId: number;
        permission: import("@prisma/client").$Enums.Permission;
    })[]>;
    static hasPermission(tacheId: number, userId: number, permission: Permission): Promise<boolean>;
    static findById(tacheId: number, userId: number, permission: Permission): Promise<PermissionUserTache | null>;
    static create(data: Omit<PermissionUserTache, "id">): Promise<PermissionUserTache>;
    static delete(data: Omit<PermissionUserTache, "id">): Promise<{
        id: number;
        userId: number;
        tacheId: number;
        permission: import("@prisma/client").$Enums.Permission;
    }>;
}
//# sourceMappingURL=PermissionUserTacheService.d.ts.map