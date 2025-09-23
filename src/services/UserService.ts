import OMprisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import { HttpStatusCode } from "../enum/StatusCode.js";
import { User } from "@prisma/client";

export class UserService 
{
  static async selectUserByLogin(login: string): Promise<User> {
    const user =  await OMprisma.user.findUnique({
        where: {login}
    });
    if (!user) throw { status: HttpStatusCode.BAD_REQUEST, message: ErrorsMessagesFr.INCORRECT_CREDENTIALS };
    return user;
  }

    static async selectUserById(id: number): Promise<User> {
    const user =  await OMprisma.user.findUnique({
        where: {id}
    });
    if (!user) throw { status: HttpStatusCode.BAD_REQUEST, message: ErrorsMessagesFr.USER_NOT_FOUND };
    return user;
  }
    static async userExists(login: string): Promise<boolean> {
    const user = await OMprisma.user.findUnique({ where: { login } });
    return !!user;
  }

 static async createUser(data: { login: string; password: string; nom: string }): Promise<User> {
  return OMprisma.user.create({
    data: {
      login: data.login,
      password: data.password,
      nom: data.nom
    },
  });
}



}
