import { Request, Response, NextFunction } from 'express';
import { HistoriqueModifTacheService } from "../services/HistoriqueModifTacheService.js";
import { PermissionSchema } from '../models/PermissionModel.js';
import { Permission } from '@prisma/client';
import { ReponseFormatter } from '../middlewaares/ReponseFormatter.js';
import { SuccessCodes } from '../enum/SuccesCodesFr.js';

export class HistoriqueModifTacheController
{
    static async getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const allModification = await HistoriqueModifTacheService.findAll(); // <--- service global
    let data: {author: string, dateCreation: string, dateModif: string, action: string}[] = [];

    allModification.forEach(modification => {
      const modif = {
        author: modification.user.nom,
        dateCreation: new Date(modification.taches.createAt).toLocaleString("fr-FR"),
        dateModif: new Date(modification.modifiedAt).toLocaleString("fr-FR"),
        action: modification.action === "PATCH"
          ? "Modification"
          : modification.action === "GET"
          ? "Lecture"
          : "Suppression"
      };
      data.push(modif);
    });

    return ReponseFormatter.success(res, data, SuccessCodes.Task_ALL_FETCHED);
  } catch (err) {
    next(err);
  }
}


    static async getAllModif(req: Request, res: Response, next: NextFunction){
        try {
            const tacheId = Number (req.params.id)
            const allModification = await HistoriqueModifTacheService.findModificationByTacheId(tacheId);
            let data: {author: string, dateCreation: string, dateModif: string, action: string}[] = []
            allModification.forEach(modification => {
                const modif = {
                    author: modification.user.nom,
                    dateCreation: new Date(modification.taches.createAt).toLocaleString("fr-FR"),
                    dateModif: new Date(modification.modifiedAt).toLocaleString("fr-FR"),
                    action: modification.action === "PATCH"? "Modification" : modification.action === "GET"? "Lecture" : "Suppression"
                }
                data.push(modif);
            });
            return ReponseFormatter.success(res, data, SuccessCodes.Task_ALL_FETCHED)
        } catch (err) {
            next(err)
        }
    }
}