import jwt from 'jsonwebtoken';
export declare class JWTService {
    static cryptData(data: Record<string, unknown>, secretKey: string, validityTime?: number): string;
    static decryptToken(token: string, AMSecret_Key: string): string | jwt.JwtPayload;
    static refreshToken(token: string, secretKey: string): Promise<string | null>;
}
//# sourceMappingURL=JWTService.d.ts.map