import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';
import { auth } from './middleware/authMiddleware';
import authRouter from './routes/authRouter';
import roomRouter from './routes/roomRouter';
import cors from 'cors';
import elementRouter from './routes/elementRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi there');
})

app.use('/auth', authRouter);

app.use('/rooms', roomRouter);

app.use('/elements', elementRouter);

app.listen(3001, () => {
    console.log(`http server listening on http://localhost:3001`);
})