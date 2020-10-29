import * as cors from 'cors';
import * as express from 'express';
import discordRouter from './routes/discord';
import { json } from 'body-parser';
import titoRouter from './routes/tito';
import verifyRouter from './routes/verify';

const app = express();

app.use(cors());
app.use(json());

app.use('/discord', discordRouter);
app.use('/tito', titoRouter);
app.use('/verify', verifyRouter);

export default app;
