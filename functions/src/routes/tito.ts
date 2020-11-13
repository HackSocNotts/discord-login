import { CallableContext, HttpsError } from 'firebase-functions/lib/providers/https';
import { confirmTicket, lookup } from '../callable/tito';
import { Request, Response } from 'firebase-functions';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/ticket', async (req: Request, res: Response) => {
  try {
    const { email, reference } = req.query as { [key: string]: string };
    const ticket = await lookup({ email, reference });

    return res.json(ticket);
  } catch (e) {
    if (e instanceof HttpsError) {
      return res.status(e.httpErrorCode.status).json({ error: true, message: e.message });
    }
    console.error(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: e.getMessage });
  }
});

router.put('/ticket/:slug/confirm', async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    const context = { auth: { uid: req.headers.authorization } } as CallableContext;
    const { slug } = req.params;

    await confirmTicket(slug, context);

    return res.status(StatusCodes.OK).send('updated');
  } catch (e) {
    if (e instanceof HttpsError) {
      return res.status(e.httpErrorCode.status).json({ error: true, message: e.message });
    }
    console.error(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: e.getMessage() });
  }
});

export default router;
