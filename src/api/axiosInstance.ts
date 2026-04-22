import axios from 'axios';
import { CONFIG } from '../config';

export const axiosInstance = axios.create({
    baseURL: CONFIG.API_BASE_URL,
});

// Aggiunge il token ad ogni richiesta in automatico
axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('inner_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem('inner_token');
            window.location.href = CONFIG.AR_BASE_URL + '/auth';
        }
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        return Promise.reject(error);
    }
);