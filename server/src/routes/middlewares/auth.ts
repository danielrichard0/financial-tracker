import { Request, Response, NextFunction } from "express";
import response from "../../utils/response";

export function authSessionCheck(req: Request, res: Response, next: NextFunction) {
    //req.session.
    if (!req.session.user) {
        console.log('ketahan')
        return res.status(401).json(response('F', 'not authenticated'))
    } else {
        next()
    }
}