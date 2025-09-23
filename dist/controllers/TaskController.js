var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaskService } from "../services/TaskService.js";
import { OMTaskSchema } from "../models/TaskModel.js";
import { Etat } from "../../node_modules/.prisma/client/index.js";
import { ReponseFormatter } from "../middlewaares/ReponseFormatter.js";
import { SuccessCodes } from "../enum/SuccesCodesFr.js";
import { HistoriqueModifTacheService } from "../services/HistoriqueModifTacheService.js";
export class TaskController {
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const OMpage = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
                const OMlimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 3;
                const OMoffset = (OMpage - 1) * OMlimit;
                const OMsearch = req.query.search || "";
                const OMsortBy = req.query.sortBy || "description";
                const OMordr = req.query.order === "desc" ? "desc" : "asc";
                const OMtasks = yield TaskService.findAll(OMoffset, OMlimit, OMsearch, OMsortBy, OMordr);
                OMtasks.forEach(OMtask => {
                    if (OMtask.image)
                        OMtask.image = `${req.protocol}:://${req.get('host')}/uploads/${OMtask.image}`;
                });
                let logViews = OMtasks.map((task) => __awaiter(this, void 0, void 0, function* () { var _a; return yield HistoriqueModifTacheService.create({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, tacheId: task.id }, req); }));
                const OMtotal = yield TaskService.count();
                const OMtotalPage = Math.ceil(OMtotal / OMlimit);
                const data = { OMpage, OMlimit, OMtotal, OMtotalPage, OMtasks };
                return ReponseFormatter.success(res, data, SuccessCodes.Task_ALL_FETCHED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const OMid = Number(req.params.id);
                const OMtask = yield TaskService.findById(OMid);
                yield HistoriqueModifTacheService.create({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, tacheId: OMtask.id }, req);
                return ReponseFormatter.success(res, OMtask, SuccessCodes.Task_FETCHED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const { titre, description, image } = req.body;
                const parsed = OMTaskSchema.parse({ titre, description, image });
                const OMnewTask = {
                    userId,
                    titre: parsed.titre,
                    description: parsed.description,
                    image: parsed.image || null,
                };
                const OMcreatedTask = yield TaskService.create(OMnewTask);
                return ReponseFormatter.success(res, OMcreatedTask, SuccessCodes.Task_CREATED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const OMid = Number(req.params.id);
                const OMdata = OMTaskSchema.partial().parse(req.body);
                const OMmodifiedTask = yield TaskService.update(OMid, OMdata, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req);
                return ReponseFormatter.success(res, OMmodifiedTask, SuccessCodes.Task_UPDATED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static updateStatusDone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const OMid = Number(req.params.id);
                const OMdata = { etat: Etat.Termine };
                const OMupdatedTaskStatus = yield TaskService.update(OMid, OMdata, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req);
                return ReponseFormatter.success(res, OMupdatedTaskStatus, SuccessCodes.Task_MARKED_DONE);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static updateStatusUndone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const OMid = Number(req.params.id);
                const OMdata = { etat: Etat.En_Cours };
                const OMupdatedTaskStatus = yield TaskService.update(OMid, OMdata, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req);
                return ReponseFormatter.success(res, OMupdatedTaskStatus, SuccessCodes.Task_MARKED_UNDONE);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const OMid = Number(req.params.id);
                yield TaskService.delete(OMid);
                return ReponseFormatter.success(res, null, SuccessCodes.Task_DELETED);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
//# sourceMappingURL=TaskController.js.map