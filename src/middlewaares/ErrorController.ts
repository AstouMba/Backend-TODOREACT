import { Request, Response, NextFunction } from "express";
import { ErrorsMessagesFr } from "../enum/ErrorsMessagesFr.js";
import { success } from "zod";
import { error } from "console";

export class ErrorController
{
    static handle(err: any, req: Request, res: Response, next: NextFunction){
        res.status(err.status || 500).json({
            success: false,
            error: err.message || ErrorsMessagesFr.ERREUR_INTERNE
        })
    }
}