import { Request, Response } from 'firebase-functions';
import DiscordService from '../services/discord';
import { Router } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('You go to the discord route.');
});

router.get('/bot/join', (_req: Request, res: Response) => {
  const discordService = new DiscordService();

  const redirectUri = discordService.generateBotRedirectURI();

  return res.redirect(redirectUri);
});

export default router;
