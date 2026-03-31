import { storageTokenOps, storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { type StoredUser } from '../types/user';

/**
 * Reads the user from sessionStorage of selfcare.
 */
export const getUserFromStorage = (): StoredUser | null => {
    // first try to read the already-decoded user object
    const storedUser = storageUserOps.read();
    if (storedUser) return storedUser as StoredUser;

    // fallback: decode user from JWT token payload
    const token = storageTokenOps.read();
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split('.')[1])) as StoredUser;
    } catch {
        return null;
    }
};

/**
 * Decodes the JWT payload, then persists both the token
 * and the decoded user object to sessionStorage.
 */
export const saveUserFromToken = (token: string): StoredUser | null => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])) as StoredUser;
        storageTokenOps.write(token);
        storageUserOps.write(payload);
        return payload;
    } catch {
        return null;
    }
};