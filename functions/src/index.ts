import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

/* eslint-disable sort-imports */
import * as auth from './callable/auth';
import * as tito from './callable/tito';
import * as verify from './callable/verify';
import * as discord from './callable/discord';
import app from './app';
/* eslint-enable sort-imports */

export const api = functions.region('us-central1').https.onRequest(app);
export const titoLookup = functions.region('europe-west2').https.onCall(tito.lookup);
export const titoConfirm = functions.region('europe-west2').https.onCall(tito.confirmTicket);
export const titoClear = functions.region('europe-west2').https.onCall(tito.clearTicket);
export const titoRefresh = functions.region('europe-west2').https.onCall(tito.refreshTicket);
export const getProfile = functions.region('europe-west2').https.onCall(auth.getUserProfile);
export const verifyStart = functions.region('europe-west2').https.onCall(verify.startVerification);
export const verifyCode = functions.region('europe-west2').https.onCall(verify.tryVerification);
export const joinDiscord = functions.region('europe-west2').https.onCall(discord.joinServer);
