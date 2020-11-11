import { CallableContext, HttpsError } from 'firebase-functions/lib/providers/https';
import { auth } from 'firebase-admin';
import { config } from 'firebase-functions';
import { Ticket } from '../types/Ticket';
import TitoService from '../services/tito';
import { updateUser } from '../services/db';

/**
 * Finds a single ticket by reference.
 *
 * @param data object containing two required parameters
 * @param data.email Email associated with the ticket
 * @param data.reference Unique Ticket Reference to lookup
 * @returns a Ticket
 * @throws if there is an error looking up the reference
 * @throws if the ticket reference is not unique
 */
export const lookup = async ({ reference, email }: { email: string; reference: string }): Promise<Ticket> => {
  try {
    const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);

    if (!reference || !email) {
      throw new HttpsError('invalid-argument', 'Reference and email are required');
    }

    if (typeof reference !== 'string' || typeof email !== 'string') {
      throw new HttpsError('invalid-argument', 'Reference and email must be strings');
    }

    const ticket = await titoInstance.findTicket(reference);

    if (ticket && ticket.email === email) {
      return ticket;
    }

    if (ticket) {
      throw new HttpsError('permission-denied', 'Email or Reference do not match');
    }

    throw new HttpsError('not-found', 'Unique ticket not found.');
  } catch (e) {
    if (e instanceof HttpsError) {
      throw e;
    }
    console.error(e);
    throw new HttpsError('internal', e.getMessage());
  }
};

export const confirmTicket = async (slug: string, context: CallableContext): Promise<void> => {
  try {
    if (!context.auth) {
      throw new HttpsError('unauthenticated', 'Not authenticated');
    }

    const { uid } = context.auth;

    const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);

    const ticket = await titoInstance.getTicket(slug);

    await updateUser(uid, {
      ticketReference: ticket.reference,
      ticketSlug: slug,
      phoneNumber: ticket.phoneNumber,
      email: ticket.email,
      firstName: ticket.first_name,
      lastName: ticket.last_name,
      fullName: ticket.name,
      verified: false,
    });

    await auth().updateUser(uid, {
      email: ticket.email,
      displayName: ticket.name,
      phoneNumber: ticket.phoneNumber,
    });

    return;
  } catch (e) {
    if (e instanceof HttpsError) {
      throw e;
    }

    if (e.isAxiosError && e.response && e.response.status === 404) {
      throw new HttpsError('not-found', 'Invalid ticket slug');
    }

    console.error(e);
    throw new HttpsError('internal', e.getMessage());
  }
};
