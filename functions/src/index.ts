import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

/* eslint-disable sort-imports */
import * as auth from './callable/auth';
import * as tito from './callable/tito';
import app from './app';
/* eslint-enable sort-imports */

export const api = functions.region('us-central1').https.onRequest(app);
export const titoLookup = functions.region('europe-west2').https.onCall(tito.lookup);
export const titoConfirm = functions.region('europe-west2').https.onCall(tito.confirmTicket);
export const titoClear = functions.region('europe-west2').https.onCall(tito.clearTicket);
export const titoRefresh = functions.region('europe-west2').https.onCall(tito.refreshTicket);
export const getProfile = functions.region('europe-west2').https.onCall(auth.getUserProfile);
