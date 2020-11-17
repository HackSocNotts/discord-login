import { CallableContext, HttpsError } from 'firebase-functions/lib/providers/https';
import { getAccessToken, getUser } from '../services/db';
import { config } from 'firebase-functions';
import DiscordService from '../services/discord';
import TitoService from '../services/tito';

export const joinServer = async (_: void, context: CallableContext): Promise<void> => {
  try {
    if (!context.auth) {
      throw new HttpsError('unauthenticated', 'Not authenticated');
    }

    const { uid } = context.auth;
    const profile = await getUser(uid);

    if (!profile.verified) {
      throw new HttpsError('permission-denied', 'Not verified');
    }

    const accessToken = await getAccessToken(uid);

    if (!accessToken) {
      throw new HttpsError('internal', 'Discord Authentication Failed. Try logging in again.');
    }

    const discordService = new DiscordService(accessToken);

    await discordService.refreshToken();

    if (process.env.FUNCTIONS_EMULATOR) {
      const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);
      if (profile.ticketReference) {
        titoInstance.checkIn(profile.ticketReference);
      }
    }

    await discordService.enroll();

    return;
  } catch (e) {
    if (e instanceof HttpsError) {
      throw e;
    }
    console.error(e);
    throw new HttpsError('internal', e.getMessage());
  }
};
