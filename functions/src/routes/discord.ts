import { AccessTokenObject, InvalidCodeError } from '../types/Discord';
import { config, Request, Response } from 'firebase-functions';
import { createUser, getVerifiedUsers, storeAccessToken, updateUser } from '../services/db';
import { auth } from 'firebase-admin';
import DiscordService from '../services/discord';
import qs from 'querystring';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userExists } from '../services/users';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('You go to the discord route.');
});

/**
 * Bot joining endpoint redirects to the discord authorize URL for
 * adding the bot to a guild
 *
 * @todo add check for if the bot is already in the configured guild
 */
router.get('/bot/join', (_req: Request, res: Response) => {
  const discordService = new DiscordService();

  const redirectUri = discordService.generateBotRedirectURI();

  return res.redirect(redirectUri);
});

router.get('/login', (_req: Request, res: Response) => {
  const discordService = new DiscordService();

  const redirectUri = discordService.generateRedirectURI();

  return res.redirect(redirectUri);
});

router.get('/return', async (req: Request, res: Response) => {
  const discordService = new DiscordService();

  if (!req.query.code) {
    console.info('No code provided to discord oauth return');
    return res.status(StatusCodes.BAD_REQUEST).send('discord access token is missing.').end();
  }

  try {
    await discordService.getAccessToken(req.query.code as string);
    const user = await discordService.getProfile();
    const exists = await userExists(user.id);

    if (exists) {
      await storeAccessToken(user.id, discordService.accessToken as AccessTokenObject);
      await updateUser(user.id, { verificationStarted: false });
      const authToken = await auth().createCustomToken(user.id);
      return res.redirect('/?' + qs.stringify({ token: authToken }));
    }

    const createdUser = await createUser({ uid: user.id }, user.avatar || undefined);
    await storeAccessToken(createdUser.uid, discordService.accessToken as AccessTokenObject);

    const authToken = await auth().createCustomToken(createdUser.uid);
    return res.redirect('/?token=' + qs.escape(authToken));
  } catch (e) {
    if (e instanceof InvalidCodeError) {
      console.warn('Provided with bad Discord Access token');
      return res.status(StatusCodes.BAD_REQUEST).send('Invalid OAuth Token.').end();
    } else {
      console.error(e);
      return res.status(500).send('Unknown Error Occurred').end();
    }
  }
});

router.get('/checkins', async (req: Request, res: Response) => {
  if (!req.query.code) {
    console.debug('No code provided for checkin route');
    return res.status(StatusCodes.BAD_REQUEST).send('Authorization code is missing').end();
  }

  if (req.query.code !== config().app.checkin_code) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Incorrect authorization code').end();
  }

  try {
    const users = await getVerifiedUsers();
    const usersCSV = users.reduce(
      (acc, val) => `${acc}${val.uid},${val.ticketReference}\n`,
      'Discord Snowflake, Ticket Reference\n',
    );

    return res.contentType('text/csv').send(usersCSV).end();
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e).end();
  }
});

export default router;
