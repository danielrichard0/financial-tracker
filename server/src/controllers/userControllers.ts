import prisma from "../prisma"
import { Prisma } from "../../prisma/generated/client"
import { Request, Response, NextFunction } from "express"
import session from "express-session"
import bcrypt from "bcrypt"
import response from "../utils/response"


export async function login(req: Request, res: Response, next: NextFunction) {

    const user = await prisma.user.findUniqueOrThrow({
        where: { email: req.body.email }
    })

    if (!user) {
        res.status(401).json(response('F', 'Akun tidak ditemukan', []))
    }

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            req.session.user = {
                id: user.id,
                email: user.email
            }
            res.json({ result: user })
        } else {
            res.status(401).json(response('F', 'Credentials yang anda masukan salah', []))
        }
    })


}

export function register(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password || !req.body.firstName || req.body.phoneNumber) {
        res.status(500).json(response('F', 'Kesalahan, data yang diterima kurang', []))
    }

    let userCreated: any
    bcrypt.hash(req.body.password, 10, async function (err, encrypted) {
        try {
            userCreated = await prisma.user.create({ data: { ...req.body, password: encrypted } })
            res.status(201).json(response('T', 'Berhasil', userCreated))
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    res.status(409).json(response('F', 'This account have been already registered!', {}))
                }
            }
        }
    })




}