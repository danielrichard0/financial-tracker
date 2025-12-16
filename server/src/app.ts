import "dotenv/config"
import express from 'express'
import userRouter from "./routes/userRoutes";
import session from 'express-session';
import prisma from "./prisma";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const app = express();

app.use(express.json());
app.use(session({
    secret: "secretrahasia123",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 jam
    },
    store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    })
}))
app.use('/api', [userRouter])


export default app