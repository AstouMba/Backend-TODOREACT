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
import { AMTaskSchema } from "../models/TaskModel.js";
import { Etat } from "@prisma/client";
import { ReponseFormatter } from "../middlewaares/ReponseFormatter.js";
import { SuccessCodes } from "../enum/SuccesCodesFr.js";
import { HistoriqueModifTacheService } from "../services/HistoriqueModifTacheService.js";
import { PermissionUserTacheService } from "../services/PermissionUserTacheService.js";
export class TaskController {
    // --- LISTE PAGINÉE ---
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AMpage = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
                const AMlimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 6;
                const AMoffset = (AMpage - 1) * AMlimit;
                const AMsearch = req.query.search || "";
                const AMsortBy = req.query.sortBy || "description";
                const AMordr = req.query.order === "desc" ? "desc" : "asc";
                const AMtasks = yield TaskService.findAll(AMoffset, AMlimit, AMsearch, AMsortBy, AMordr);
                AMtasks.forEach(t => {
                    if (t.image)
                        t.image = `${req.protocol}://${req.get('host')}/uploads/images/${t.image}`;
                    if (t.audio)
                        t.audio = `${req.protocol}://${req.get('host')}/uploads/audios/${t.audio}`;
                });
                const AMtotal = AMsearch ? yield TaskService.countFiltered(AMsearch) : yield TaskService.count();
                const AMtotalPage = Math.ceil(AMtotal / AMlimit);
                AMtasks.forEach((t) => __awaiter(this, void 0, void 0, function* () { var _a; return yield HistoriqueModifTacheService.create({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, tacheId: t.id }, req); }));
                return ReponseFormatter.success(res, { AMpage, AMlimit, AMtotal, AMtotalPage, AMtasks }, SuccessCodes.Task_ALL_FETCHED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // --- DÉTAIL TÂCHE ---
    static getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const AMid = Number(req.params.id);
                const AMtask = yield TaskService.findById(AMid);
                yield HistoriqueModifTacheService.create({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, tacheId: AMid }, req);
                return ReponseFormatter.success(res, AMtask, SuccessCodes.Task_FETCHED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // --- CRÉATION ---
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const { titre, description } = req.body;
                if (!titre.trim()) {
                    return res.status(400).json({ message: "Titre obligatoire" });
                }
                const AMnewTask = {
                    userId,
                    titre: titre.trim(),
                    description: description.trim(),
                    image: ((_d = (_c = (_b = req.files) === null || _b === void 0 ? void 0 : _b.image) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.filename) || null,
                    audio: ((_g = (_f = (_e = req.files) === null || _e === void 0 ? void 0 : _e.audio) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.filename) || null
                };
                const AMcreatedTask = yield TaskService.create(AMnewTask);
                return ReponseFormatter.success(res, AMcreatedTask, SuccessCodes.Task_CREATED);
            }
            catch (err) {
                console.error("Erreur création tâche:", err);
                return res.status(500).json({ message: "Erreur serveur lors de la création de la tâche" });
            }
        });
    }
    // --- MODIFICATION ---
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const AMid = Number(req.params.id);
                // On construit l'objet update sans les undefined
                const updateData = {};
                if (req.body.titre)
                    updateData.titre = req.body.titre;
                if (req.body.description)
                    updateData.description = req.body.description;
                const files = req.files;
                if ((_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0])
                    updateData.image = files.image[0].filename;
                if ((_b = files === null || files === void 0 ? void 0 : files.audio) === null || _b === void 0 ? void 0 : _b[0])
                    updateData.audio = files.audio[0].filename;
                const AMdata = AMTaskSchema.partial().parse(updateData);
                const [AMupdatedTask, log] = yield TaskService.update(AMid, AMdata, Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.id), req);
                return ReponseFormatter.success(res, AMupdatedTask, SuccessCodes.Task_UPDATED);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // --- MARQUER COMME TERMINÉ ---
    static updateStatusDone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const AMid = Number(req.params.id);
                const [AMupdatedTask] = yield TaskService.update(AMid, { etat: Etat.Termine }, Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id), req);
                return ReponseFormatter.success(res, AMupdatedTask, SuccessCodes.Task_MARKED_DONE);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // --- MARQUER COMME EN COURS ---
    static updateStatusUndone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const AMid = Number(req.params.id);
                const [AMupdatedTask] = yield TaskService.update(AMid, { etat: Etat.En_Cours }, Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id), req);
                return ReponseFormatter.success(res, AMupdatedTask, SuccessCodes.Task_MARKED_UNDONE);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // --- SUPPRESSION ---
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const AMid = Number(req.params.id);
                const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                const AMtask = yield TaskService.findById(AMid);
                // Vérification permission
                if (AMtask.userId !== userId) {
                    const hasPermission = yield PermissionUserTacheService.hasPermission(AMid, userId, "DELETE");
                    if (!hasPermission) {
                        return res.status(403).json({ error: "Pas de permission pour supprimer cette tâche" });
                    }
                }
                yield TaskService.delete(AMid);
                return ReponseFormatter.success(res, null, SuccessCodes.Task_DELETED);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
//# sourceMappingURL=TaskController.js.map