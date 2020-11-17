// import { Ticket } from '../types/Ticket';
import { functions } from "./index";

export const titoLookup = functions.httpsCallable("titoLookup");
export const titoConfirm = functions.httpsCallable("titoConfirm");
export const titoClear = functions.httpsCallable("titoClear");
export const titoRefresh = functions.httpsCallable("titoRefresh");
export const getProfile = functions.httpsCallable("getProfile");
