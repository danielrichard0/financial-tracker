import { Router } from 'express';
import { login, register } from '../controllers/userControllers';

import { sessionCheck } from '../controllers/userControllers';

const router = Router()



// router.get('/test', authSessionCheck, (req, res, next) => {
//     console.log('cookie : ' + req.sessionID)
//     console.log(req.session.user)
//     req.sessionStore.get(req.sessionID, (err, session) => {
//         console.log(session)
//     })
//     res.sendStatus(200)
// })
router.get('/session', sessionCheck)
router.post('/login', login)
router.post('/register', register)


export default router