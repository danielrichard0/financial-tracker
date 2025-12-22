import { Request, Response, NextFunction } from "express";
import response from "../../utils/response";

export function authSessionCheck(req: Request, res: Response, next: NextFunction) {
    if (!req.session) {
        res.status(500).json(response('F', 'not authenticated', []))
    } else {
        next()
    }
}