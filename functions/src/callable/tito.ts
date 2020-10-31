import { config } from 'firebase-functions';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { Ticket } from '../types/Ticket';
import TitoService from '../services/tito';

/**
 * Finds a single ticket by reference.
 *
 * @param reference Unique Ticket Reference to lookup
 * @returns a Ticket
 * @throws if there is an error looking up the reference
 * @throws if the ticket reference is not unique
 */
export const lookup = async (reference: string): Promise<Ticket> => {
  try {
    const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);

    const ticket = await titoInstance.findTicket(reference);

    if (ticket) {
      return ticket;
    }

    throw new HttpsError('not-found', 'Unique ticket not found.');
  } catch (e) {
    console.error(e);
    throw new HttpsError('internal', e.getMessage());
  }
};
