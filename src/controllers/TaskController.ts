import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/TaskService.js";
import { AMTaskSchema } from "../models/TaskModel.js";
import { Etat } from "@prisma/client";
import { ReponseFormatter } from "../middlewaares/ReponseFormatter.js";
import { SuccessCodes } from "../enum/SuccesCodesFr.js";
import { HistoriqueModifTacheService } from "../services/HistoriqueModifTacheService.js";
import { PermissionUserTacheService } from "../services/PermissionUserTacheService.js";
import * as z from "zod";


export class TaskController {

  // --- LISTE PAGINÉE ---
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const AMpage = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
      const AMlimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 6;
      const AMoffset = (AMpage - 1) * AMlimit;
      const AMsearch = (req.query.search as string) || "";
      const AMsortBy = (req.query.sortBy as string) || "description";
      const AMordr = (req.query.order as string) === "desc" ? "desc" : "asc";

      const AMtasks = await TaskService.findAll(AMoffset, AMlimit, AMsearch, AMsortBy, AMordr);
      AMtasks.forEach(t => {
        if(t.image) t.image = `${req.protocol}://${req.get('host')}/uploads/images/${t.image}`;
        if(t.audio) t.audio = `${req.protocol}://${req.get('host')}/uploads/audios/${t.audio}`;
      });

      const AMtotal = AMsearch ? await TaskService.countFiltered(AMsearch) : await TaskService.count();
      const AMtotalPage = Math.ceil(AMtotal / AMlimit);

      AMtasks.forEach(async t => await HistoriqueModifTacheService.create({ userId: req.user?.id, tacheId: t.id }, req));

      return ReponseFormatter.success(res, { AMpage, AMlimit, AMtotal, AMtotalPage, AMtasks }, SuccessCodes.Task_ALL_FETCHED);
    } catch (err) {
      next(err);
    }
  }

  // --- DÉTAIL TÂCHE ---
  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const AMid = Number(req.params.id);
      const AMtask = await TaskService.findById(AMid);
      await HistoriqueModifTacheService.create({ userId: req.user?.id, tacheId: AMid }, req);
      return ReponseFormatter.success(res, AMtask, SuccessCodes.Task_FETCHED);
    } catch (err) {
      next(err);
    }
  }

  // --- CRÉATION ---
 static async create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.user?.id);

    const { titre, description } = req.body;

    if (!titre.trim()) {
      return res.status(400).json({ message: "Titre obligatoire" });
    }

    const AMnewTask = {
      userId,
      titre: titre.trim(),
      description: description.trim(),
      image: (req.files as { [fieldname: string]: Express.Multer.File[] })?.image?.[0]?.filename || null,
      audio: (req.files as { [fieldname: string]: Express.Multer.File[] })?.audio?.[0]?.filename || null
    };

    const AMcreatedTask = await TaskService.create(AMnewTask);

    return ReponseFormatter.success(res, AMcreatedTask, SuccessCodes.Task_CREATED);

  } catch (err) {
    console.error("Erreur création tâche:", err);
    return res.status(500).json({ message: "Erreur serveur lors de la création de la tâche" });
  }
}


  // --- MODIFICATION ---
static async update(req: Request, res: Response, next: NextFunction) {
  try {
    const AMid = Number(req.params.id);

    // On construit l'objet update sans les undefined
    const updateData: Partial<z.infer<typeof AMTaskSchema>> = {};
    if (req.body.titre) updateData.titre = req.body.titre;
    if (req.body.description) updateData.description = req.body.description;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files?.image?.[0]) updateData.image = files.image[0].filename;
    if (files?.audio?.[0]) updateData.audio = files.audio[0].filename;

    const AMdata = AMTaskSchema.partial().parse(updateData);

    const [AMupdatedTask, log] = await TaskService.update(
      AMid,
      AMdata as Partial<any>, 
      Number(req.user?.id),
      req
    );

    return ReponseFormatter.success(res, AMupdatedTask, SuccessCodes.Task_UPDATED);
  } catch (err) {
    next(err);
  }
}

  // --- MARQUER COMME TERMINÉ ---
  static async updateStatusDone(req: Request, res: Response, next: NextFunction) {
    try {
      const AMid = Number(req.params.id);
      const [AMupdatedTask] = await TaskService.update(AMid, { etat: Etat.Termine }, Number(req.user?.id), req);
      return ReponseFormatter.success(res, AMupdatedTask, SuccessCodes.Task_MARKED_DONE);
    } catch (err) {
      next(err);
    }
  }

  // --- MARQUER COMME EN COURS ---
  static async updateStatusUndone(req: Request, res: Response, next: NextFunction) {
    try {
      const AMid = Number(req.params.id);
      const [AMupdatedTask] = await TaskService.update(AMid, { etat: Etat.En_Cours }, Number(req.user?.id), req);
      return ReponseFormatter.success(res, AMupdatedTask, SuccessCodes.Task_MARKED_UNDONE);
    } catch (err) {
      next(err);
    }
  }

  // --- SUPPRESSION ---
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const AMid = Number(req.params.id);
      const userId = Number(req.user?.id);

      const AMtask = await TaskService.findById(AMid);

      // Vérification permission
      if(AMtask.userId !== userId){
        const hasPermission = await PermissionUserTacheService.hasPermission(AMid, userId, "DELETE");
        if(!hasPermission){
          return res.status(403).json({ error: "Pas de permission pour supprimer cette tâche" });
        }
      }

      await TaskService.delete(AMid);
      return ReponseFormatter.success(res, null, SuccessCodes.Task_DELETED);

    } catch (err) {
      next(err);
    }
  }
}
