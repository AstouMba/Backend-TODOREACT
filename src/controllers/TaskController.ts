import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/TaskService.js";
import { OMTaskSchema } from "../models/TaskModel.js";
import { Etat} from "../../node_modules/.prisma/client/index.js"
import { ReponseFormatter } from "../middlewaares/ReponseFormatter.js";
import { SuccessCodes } from "../enum/SuccesCodesFr.js";
import { JWTService } from "../services/JWTService.js";
import { describe } from "node:test";
import { HistoriqueModifTacheService } from "../services/HistoriqueModifTacheService.js";


export class TaskController
{
    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const OMpage = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
            const OMlimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 3;
            const OMoffset = (OMpage - 1) * OMlimit;

            const OMsearch = (req.query.search as string) || "";

            const OMsortBy = (req.query.sortBy as string) || "description";
            const OMordr = (req.query.order as string) === "desc"? "desc" : "asc";

            const OMtasks = await TaskService.findAll(OMoffset, OMlimit, OMsearch, OMsortBy, OMordr)
            OMtasks.forEach(OMtask => {
                if(OMtask.image)OMtask.image = `${req.protocol}:://${req.get('host')}/uploads/${OMtask.image}`  
            });

            let logViews = OMtasks.map(async task => await HistoriqueModifTacheService.create({userId: req.user?.id, tacheId: task.id}, req))
            const OMtotal = await TaskService.count();
            const OMtotalPage = Math.ceil(OMtotal/OMlimit)
            const data = {OMpage, OMlimit ,OMtotal, OMtotalPage, OMtasks}
            return ReponseFormatter.success(res, data, SuccessCodes.Task_ALL_FETCHED)
        } catch (err) {
            next(err)
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction){
        try {
            const OMid = Number (req.params.id)
            const OMtask = await TaskService.findById(OMid)
            await HistoriqueModifTacheService.create({userId: req.user?.id, tacheId: OMtask.id}, req)
            return ReponseFormatter.success(res, OMtask, SuccessCodes.Task_FETCHED)
        } catch (err: any) {
           next(err) 
        }
    }

static async create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.user?.id);
    const { titre, description, image } = req.body;

    const parsed = OMTaskSchema.parse({ titre, description, image });

    const OMnewTask = {
      userId,
      titre: parsed.titre,
      description: parsed.description,
      image: parsed.image || null, 
    };

    const OMcreatedTask = await TaskService.create(OMnewTask);
    return ReponseFormatter.success(res, OMcreatedTask, SuccessCodes.Task_CREATED);

  } catch (err) {
    next(err);
  }
}



    static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const OMid = Number (req.params.id);
      const OMdata = OMTaskSchema.partial().parse(req.body) as { description: string, image?: string }
      const OMmodifiedTask = await TaskService.update(OMid, OMdata, req.user?.id,req );
      return ReponseFormatter.success(res, OMmodifiedTask, SuccessCodes.Task_UPDATED);
    } catch (err) {
        next(err)
    }
  }
  
    static async updateStatusDone(req: Request, res: Response, next: NextFunction){
        try {
            const OMid = Number (req.params.id);
            const OMdata = {etat: Etat.Termine}
            const OMupdatedTaskStatus = await TaskService.update(OMid, OMdata, req.user?.id, req);
            return ReponseFormatter.success(res, OMupdatedTaskStatus, SuccessCodes.Task_MARKED_DONE);
        } catch (err) {
            next(err)
        }
    }

    static async updateStatusUndone(req: Request, res: Response, next: NextFunction){
        try {
            const OMid = Number (req.params.id);
            const OMdata = {etat: Etat.En_Cours}
            const OMupdatedTaskStatus = await TaskService.update(OMid, OMdata, req.user?.id, req);
            return ReponseFormatter.success(res, OMupdatedTaskStatus, SuccessCodes.Task_MARKED_UNDONE);
        } catch (err) {
            next(err)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
        const OMid = Number (req.params.id);
        await TaskService.delete(OMid);
        return ReponseFormatter.success(res, null, SuccessCodes.Task_DELETED);
        } catch (err) {
           next(err) 
        }
  }

}