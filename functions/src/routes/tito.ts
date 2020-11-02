import { auth, firestore } from 'firebase-admin';
import { config, Request, Response } from 'firebase-functions';
import { createUser, updateUser } from '../services/db';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Ticket } from '../types/Ticket';
import TitoService from '../services/tito';
import { User } from '../types/User';

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

router.get('/ticket', async (req: Request, res: Response) => {
  try {
    const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);
    const { reference, email } = req.query;

    console.log(reference, email);

    if (!reference || !email) {
      return res.status(StatusCodes.BAD_REQUEST).send('Reference and email are required');
    }

    if (typeof reference !== 'string' || typeof email !== 'string') {
      return res.status(StatusCodes.BAD_REQUEST).send('Reference and email must be strings');
    }

    const ticket = await titoInstance.findTicket(reference);

    if (ticket && ticket.email === email) {
      return res.json(ticket);
    }

    if (ticket) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: true, message: 'Email or Reference do not match' });
    }

    return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Unique ticket not found.' });
  } catch (e) {
    console.error(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: e.getMessage });
  }
});

router.put('/ticket/:slug/confirm', async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);

    const { slug } = req.params;

    const ticket = await titoInstance.getTicket(slug);

    await updateUser(req.headers.authorization, {
      ticketReference: ticket.reference,
      ticketSlug: slug,
      phoneNumber: ticket.phoneNumber,
      email: ticket.email,
      firstName: ticket.first_name,
      lastName: ticket.last_name,
      fullName: ticket.name,
      verified: false,
    });

    await auth().updateUser(req.headers.authorization, {
      email: ticket.email,
      displayName: ticket.name,
      phoneNumber: ticket.phoneNumber,
    });

    return res.status(StatusCodes.OK).send('updated');
  } catch (e) {
    if (e.isAxiosError && e.response && e.response.status === 404) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Invalid ticket slug' });
    }

    console.error(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: e.getMessage });
  }
});

router.post('/ticket/:reference/createUser', async (req: Request, res: Response) => {
  try {
    const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);
    const { reference } = req.params;

    const ticket = await titoInstance.findTicket(reference);

    if (!ticket) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Unique ticket not found.' });
    }

    const fullTicket = await titoInstance.getTicket(ticket.slug);

    const newUser: User = {
      uid: ticket.slug,
      ticketSlug: ticket.slug,
      ticketReference: reference,
      phoneNumber: fullTicket.phoneNumber,
      email: ticket.email,
      firstName: ticket.first_name,
      lastName: ticket.last_name,
      fullName: ticket.name,
      verified: false,
    };

    const user = await createUser(newUser);

    return res.status(StatusCodes.CREATED).json(user);
  } catch (e) {
    console.error(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: e.getMessage });
  }
});

export default router;
