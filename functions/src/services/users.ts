import { auth } from 'firebase-admin';

/**
 * Helper function for checking if a user exists
 *
 * @todo remove the FUNCTIONS_EMULATOR check once missing user handling is patched
 * @param uid User ID
 * @returns if the user exists
 */
export const userExists = async (uid: string): Promise<boolean> => {
  try {
    const user = await auth().getUser(uid);
    if (user) {
      return true;
    }

    return false;
  } catch (e) {
    if (e.code === 'auth/user-not-found') {
      return false;
    } else if (process.env.FUNCTIONS_EMULATOR) {
      return false;
    }
    throw e;
  }
};
