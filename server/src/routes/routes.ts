import { Router } from 'express';

const router = Router()

router.get('/test', (req, res) => {
    console.log('executing . . .')
    res.json({ message: "hello world" })
})

export default router
