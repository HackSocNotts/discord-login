import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

import app from './app';

export const api = functions.region('us-central1').https.onRequest(app);
