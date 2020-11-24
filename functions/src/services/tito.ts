import axios, { AxiosInstance } from 'axios';
import { config } from 'firebase-functions';
import { Nullable } from '../types/utils';
import { sanitizePhone } from '../utilities/sanitizePhone';
import { Ticket } from '../types/Ticket';

class TitoService {
  instance: AxiosInstance;
  organization: string;
  event: string;

  constructor(apiKey: string, organization: string, event: string) {
    this.instance = axios.create({
      baseURL: 'https://api.tito.io/v3/',
      headers: {
        Authorization: `Token token=${apiKey}`,
      },
    });

    this.organization = organization;
    this.event = event;
  }

  async getTickets(): Promise<Ticket[]> {
    const response = await this.instance.get<Ticket[]>(`/${this.organization}/${this.event}/tickets`);
    return response.data;
  }

  /**
   * Finds a single ticket by reference.
   *
   * @param reference Unique Ticket Reference to lookup
   * @returns null if the number of tickets found is not 1, otherwise, it returns a Ticket
   */
  async findTicket(reference: string): Promise<Nullable<Ticket>> {
    try {
      const response = await this.instance.get<{ tickets: Ticket[] }>(
        `${this.organization}/${this.event}/tickets?search[q]=${reference}`,
      );

      if (response.data.tickets.length === 1) {
        return response.data.tickets[0];
      }

      return null;
    } catch (e) {
      throw e;
    }
  }

  async getTicket(slug: string): Promise<Ticket & { phoneNumber: string }> {
    try {
      const response = await this.instance.get<{ ticket: Ticket & { responses: { 'phone-number': string } } }>(
        `${this.organization}/${this.event}/tickets/${slug}`,
      );

      return {
        ...response.data.ticket,
        phoneNumber: await sanitizePhone(response.data.ticket.responses['phone-number']),
      };
    } catch (e) {
      throw e;
    }
  }

  async checkIn(reference: string): Promise<void> {
    try {
      await axios.post(
        `https://checkin.tito.io/checkin_lists/${config().tito.check_in_list}/checkins/`,
        {
          checkin: {
            ticket_reference: reference,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      return;
    } catch (e) {
      throw e;
    }
  }
}

export default TitoService;
