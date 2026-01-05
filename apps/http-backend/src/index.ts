import 'dotenv/config';
import express from 'express';
import authRouter from './routes/authRouter';
import roomRouter from './routes/roomRouter';
import cors from 'cors';
import elementRouter from './routes/elementRouter';
import inviteRouter from './routes/inviteRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi there');
})

app.use('/auth', authRouter);

app.use('/rooms', roomRouter);

app.use('/elements', elementRouter);

app.use('/invite', inviteRouter);

app.listen(3001, () => {
    console.log(`http server listening on http://localhost:3001`);
})