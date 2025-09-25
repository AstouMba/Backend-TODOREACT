import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { HttpStatusCode } from "../enum/StatusCode.js";

export class UserController {
static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers(); 
      const safeUsers = users.map(u => ({ id: u.id, login: u.login, nom: u.nom })); 
      res.status(HttpStatusCode.OK).json(safeUsers);
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erreur serveur' });
    }
  }
}
