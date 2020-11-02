import { checkVerification, getVerificationStatus, startVerifyViaSms } from '../services/twilio';
import { getUser, updateUser } from '../services/db';
import { Request, Response } from 'firebase-functions';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { VerificationStatus } from '../types/Twilio';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('You go to the verify route');
});

/**
 * Start a verification
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    const user = await getUser(req.headers.authorization);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    if (!user.phoneNumber) {
      console.log(user);
      return res.status(StatusCodes.FORBIDDEN).json({ error: true, message: 'No ticket assigned to user' });
    }

    const sid = await startVerifyViaSms(user.phoneNumber);
    return res.json({ sid });
  } catch (e) {
    console.error(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
});

/**
 * Get a verification status
 */
router.get('/:vid', async (req: Request, res: Response) => {
  try {
    const status = await getVerificationStatus(req.params.vid);
    res.json({ status });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
});

/**
 * Verify with code
 */
router.put('/', async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    const user = await getUser(req.headers.authorization);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    if (!user.phoneNumber) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: true, message: 'No ticket assigned to user' });
    }

    const status = await checkVerification(user.phoneNumber, req.body.code);

    if (status === VerificationStatus.APPROVED) {
      await updateUser(req.headers.authorization, {
        verified: true,
      });
    }

    return res.json({ status });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
});

export default router;
