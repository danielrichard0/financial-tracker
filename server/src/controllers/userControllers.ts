import prisma from "../prisma"
import { Prisma } from "../../prisma/generated/client"
import { Request, Response, NextFunction } from "express"
import session from "express-session"
import bcrypt from "bcrypt"
import response from "../utils/response"

export async function sessionCheck(req: Request, res: Response, next: NextFunction) {
    console.log('sampe sini')
    if (!req.session.user) {
        res.status(401).json(response('F', 'Not authenticated'))
    } else {
        console.log('session okay')
        res.sendStatus(200)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {

    const user = await prisma.user.findUniqueOrThrow({
        where: { email: req.body.email }
    })

    if (!user) {
        res.status(401).json(response('F', 'Akun tidak ditemukan', []))
    }


    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) { console.log(err.message) }
        if (result) {
            req.session.user = {
                username: user.username,
                email: user.email
            }
            res.status(200)
                .cookie('user', { username: user.firstName, email: user.email })
                .json(response('T'))
        } else {
            res.status(401).json(response('F', 'Credentials yang anda masukan salah', []))
        }
    })


}

export async function register(req: Request, res: Response) {
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.phoneNumber || !req.body.username) {
        return res.status(400).json(response('F', 'Kesalahan, data yang diterima kurang', []))
    }

    try {
        const encrypted = await bcrypt.hash(req.body.password, 10)

        const userCreated = await prisma.user.create({
            data: { ...req.body, password: encrypted }
        })

        req.session.user = {
            username: userCreated.username,
            email: userCreated.email
        }
        return res.status(201).json(response('T', 'Berhasil', userCreated))
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            return res.sendStatus(409)
        }
        return res.sendStatus(500)
    }
}
