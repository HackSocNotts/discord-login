import { checkVerification, getVerificationStatus, startVerifyViaSms } from '../services/twilio';
import { Request, Response } from 'firebase-functions';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('You go to the verify route');
});

/**
 * Start a verification
 */
router.post('/:phone_number', async (req: Request, res: Response) => {
  try {
    const sid = await startVerifyViaSms(req.params.phone_number);
    res.json({ sid });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
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
router.put('/:vid', async (req: Request, res: Response) => {
  try {
    const status = await checkVerification(req.params.vid, req.body.code);
    res.json({ status });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
});

export default router;
