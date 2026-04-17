import { storageTokenOps, storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { type StoredUser } from '../types/user';

export const isTokenExpired = (token: string): boolean => {
    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return typeof exp === 'number' && exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

/**
 * Reads the user from sessionStorage of selfcare.
 */
export const getUserFromStorage = (): StoredUser => {
    const token = storageTokenOps.read();
    if (!token || isTokenExpired(token)) {
        // clean of token if is expired
        if (token) {
            storageTokenOps.delete();
            storageUserOps.delete();
        }
        return {} as StoredUser;
    }

    const storedUser = storageUserOps.read();
    if (storedUser) return storedUser as StoredUser;

    try {
        return JSON.parse(atob(token.split('.')[1])) as StoredUser;
    } catch {
        return {} as StoredUser;
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