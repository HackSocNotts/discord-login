import cors from 'cors';
import discordRouter from './routes/discord';
import express from 'express';
import { json } from 'body-parser';

const app = express();
const router = express.Router();

app.use(cors());
app.use(json());

router.use('/discord', discordRouter);

app.use('/', router);
app.use('/api', router);

export default app;
