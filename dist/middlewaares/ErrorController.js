import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
export class ErrorController {
    static handle(err, req, res, next) {
        res.status(err.status || 500).json({
            success: false,
            error: err.message || ErrorsMessagesFr.ERREUR_INTERNE
        });
    }
}
//# sourceMappingURL=ErrorController.js.map