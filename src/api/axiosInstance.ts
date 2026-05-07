import { CONFIG } from '../config';
import { setSessionError } from '../redux/slices/sessionSlice';
import { addNotification } from '../redux/slices/notificationSlice'; // ← cambia import
import { store } from '../redux/store';

import { storageTokenOps, storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import axios from 'axios';

const BASE_URL = `${CONFIG.API_BASE_URL}/api/`;

const FALLBACK_NOTIFICATION = {
    message: 'Si è verificato un errore imprevisto. Riprova più tardi.',
    severity: 'error' as const,
};

export const axiosPublicInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
});

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
});

axiosInstance.interceptors.request.use((config) => {
    const token = storageTokenOps.read();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            switch (status) {
                case 401:
                    storageTokenOps.delete();
                    storageUserOps.delete();
                    store.dispatch(setSessionError('UNAUTHORIZED'));
                    break;
                case 403:
                    store.dispatch(setSessionError('FORBIDDEN'));
                    break;
                default:
                    if (!status || status >= 500) {
                        store.dispatch(addNotification(FALLBACK_NOTIFICATION));
                    }
                    break;
            }
        }
        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
);