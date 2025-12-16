import prisma from "../prisma"
import { Prisma } from "../../prisma/generated/client"
import { Request, Response, NextFunction } from "express"
import response from "../utils/response"

export async function login(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findUniqueOrThrow({
        where: { email: req.body.email }
    })
    res.json({ result: user })
}

export async function register(req: Request, res: Response, next: NextFunction) {
    let userCreated;
    try {
        userCreated = await prisma.user.create({ data: req.body })
        res.status(201).json(response(400, 'T', 'Berhasil', userCreated))
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                res.status(409).json(response(404, 'F', 'This account have been already registered!', {}))
            }
        }
    }


}