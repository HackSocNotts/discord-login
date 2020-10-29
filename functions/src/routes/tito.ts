import { config, Request, Response } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Ticket } from '../types/Ticket';
import TitoService from '../services/tito';

const router = Router();
const db = firestore();

router.post('/webhook', async (req: Request, res: Response) => {
  const body = req.body as Ticket;

  try {
    const docRef = db.doc(`tickets/${body.slug}`);
    if ((await docRef.get()).exists) {
      await docRef.set(body);
      return res.status(StatusCodes.NO_CONTENT).send();
    }

    await docRef.set(body);
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    throw e;
  }
});

router.get('/ticket/:reference', async (req: Request, res: Response) => {
  try {
    const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);
    const { reference } = req.params;

    const ticket = await titoInstance.findTicket(reference);

    if (ticket) {
      return res.json(ticket);
    }

    return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Unique ticket not found.' });
  } catch (e) {
    console.error(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: e.getMessage });
  }
});

export default router;
