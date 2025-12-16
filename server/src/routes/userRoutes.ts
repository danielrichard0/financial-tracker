import { Router } from 'express';
import prisma from '../prisma'
import { login, register } from '../controllers/userControllers';

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/login/2', (req, res, next) => { })

export default router