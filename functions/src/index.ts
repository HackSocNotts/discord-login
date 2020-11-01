import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

import * as tito from './callable/tito';
import app from './app';

export const api = functions.region('us-central1').https.onRequest(app);
export const titoLookup = functions.region('europe-west2').https.onCall(tito.lookup);
