import { User } from "@prisma/client";
export declare class UserService {
    static selectUserByLogin(login: string): Promise<User>;
    static selectUserById(id: number): Promise<User>;
    static userExists(login: string): Promise<boolean>;
    static createUser(data: {
        login: string;
        password: string;
        nom: string;
    }): Promise<User>;
}
//# sourceMappingURL=UserService.d.ts.map