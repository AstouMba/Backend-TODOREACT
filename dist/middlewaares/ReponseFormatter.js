import { HttpStatusCode } from "../enum/StatusCode.js";
export class ReponseFormatter {
    static success(res, data, message, status = HttpStatusCode.OK) {
        return res.status(status).json({
            succes: true,
            message,
            data
        });
    }
}
//# sourceMappingURL=ReponseFormatter.js.map