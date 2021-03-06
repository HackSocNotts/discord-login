import { CallableContext, HttpsError } from 'firebase-functions/lib/providers/https';
import { clearUser, getUser, updateUser } from '../services/db';
import { auth } from 'firebase-admin';
import { config } from 'firebase-functions';
import { sanitizePhone } from '../utilities/sanitizePhone';
import { Ticket } from '../types/Ticket';
import TitoService from '../services/tito';

const verify_active = config().twilio.verify_active === 'true';

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
    throw new HttpsError('internal', e);
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
      verified: !verify_active,
      ticketReleaseId: ticket.release_id,
      ticketReleaseTitle: ticket.release_title,
      ticketUrl: ticket.unique_url,
      verificationStarted: false,
    });

    await auth().updateUser(uid, {
      email: ticket.email,
      displayName: ticket.name,
      phoneNumber: await sanitizePhone(ticket.phoneNumber),
    });

    return;
  } catch (e) {
    if (e instanceof HttpsError) {
      throw e;
    }

    if (e.isAxiosError && e.response && e.response.status === 404) {
      throw new HttpsError('not-found', 'Invalid ticket slug');
    }

    if (e.message === 'Invalid Phone Number. Must be E.164 Formatted') {
      throw new HttpsError(
        'invalid-argument',
        'The phone number on your ticket appears to be invalid. Please ensure that your phone number starts with its country code, or a 0 if it is a UK number.\nIf you are entering a UK number, do not include the 0 and 44.\nYou can update your ticket by clicking the link marked "ticket" below.',
      );
    }

    console.error(e);
    throw new HttpsError('internal', e);
  }
};

export const refreshTicket = async (_: void, context: CallableContext): Promise<void> => {
  try {
    if (!context.auth) {
      throw new HttpsError('unauthenticated', 'Not authenticated');
    }

    const { uid } = context.auth;
    const titoInstance = new TitoService(config().tito.token, config().tito.organization, config().tito.event);

    const user = await getUser(uid);
    const slug = user.ticketSlug;

    if (!slug) {
      throw new HttpsError('permission-denied', 'No ticket to refresh');
    }

    const ticket = await titoInstance.getTicket(slug);

    await updateUser(uid, {
      ticketReference: ticket.reference,
      ticketSlug: slug,
      phoneNumber: ticket.phoneNumber,
      email: ticket.email,
      firstName: ticket.first_name,
      lastName: ticket.last_name,
      fullName: ticket.name,
      verified: !verify_active,
      ticketReleaseId: ticket.release_id,
      ticketReleaseTitle: ticket.release_title,
      ticketUrl: ticket.unique_url,
      verificationStarted: false,
    });

    await auth().updateUser(uid, {
      email: ticket.email,
      displayName: ticket.name,
      phoneNumber: await sanitizePhone(ticket.phoneNumber),
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
    throw new HttpsError('internal', e);
  }
};

export const clearTicket = async (_: void, context: CallableContext): Promise<void> => {
  try {
    if (!context.auth) {
      throw new HttpsError('unauthenticated', 'Not authenticated');
    }

    const { uid } = context.auth;

    await clearUser(uid);

    await auth().updateUser(uid, {
      email: undefined,
      displayName: undefined,
      phoneNumber: undefined,
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
    throw new HttpsError('internal', e.message);
  }
};
