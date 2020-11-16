// import { Ticket } from '../types/Ticket';
import { functions } from "./index";

export const titoLookup = functions.httpsCallable("titoLookup");
export const titoConfirm = functions.httpsCallable("titoConfirm");
