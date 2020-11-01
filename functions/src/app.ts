import cors from 'cors';
import discordRouter from './routes/discord';
import express from 'express';
import { json } from 'body-parser';
import titoRouter from './routes/tito';
import verifyRouter from './routes/verify';

const app = express();
const router = express.Router();

app.use(cors());
app.use(json());

router.use('/discord', discordRouter);
router.use('/tito', titoRouter);
router.use('/verify', verifyRouter);

app.use('/', router);
app.use('/api', router);

export default app;
