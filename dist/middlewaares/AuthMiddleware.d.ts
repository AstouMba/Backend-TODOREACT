import { Request, Response, NextFunction } from "express";
export declare class AuthMiddleware {
    static authenticateUser(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
    static authorizeModification(req: Request, res: Response, next: NextFunction): Promise<void>;
    static authorizePermission(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=AuthMiddleware.d.ts.map