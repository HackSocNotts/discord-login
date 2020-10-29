import { Request, Response } from 'firebase-functions';
import { Router } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('You go to the discord route.');
});

export default router;
