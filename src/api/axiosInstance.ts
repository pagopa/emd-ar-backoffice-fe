import { CONFIG } from '../config';
import { setSessionError } from '../redux/slices/sessionSlice';
import { store } from '../redux/store';

import { storageTokenOps, storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import axios from 'axios';

const BASE_URL = `${CONFIG.API_BASE_URL}/api/`;

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
            switch (error.response?.status) {
                case 401:
                    storageTokenOps.delete();
                    storageUserOps.delete();
                    store.dispatch(setSessionError('UNAUTHORIZED'));
                    break;
                case 403:
                    store.dispatch(setSessionError('FORBIDDEN'));
                    break;
                case 500:
                    store.dispatch(setSessionError('SERVER_ERROR'));
                    break;
            }
        }
        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
);