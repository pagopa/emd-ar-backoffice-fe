import { CONFIG } from '../config';
import { setSessionError } from '../redux/slices/sessionSlice';
import { appStateActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';
import { store } from '../redux/store';
import { storageTokenOps, storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import axios, { type AxiosError } from 'axios';
import { setTppRegistered } from '../redux/slices/organizationSlice';
import { applyMockScenario } from '../mocks/mockInterceptor';
import { MOCK_TPP_CREDENTIALS, MOCK_PAGOPA_CREDENTIALS, MOCK_ENDPOINT_PAGE } from '../mocks/tpp';

const MOCK_RESPONSES: Record<string, unknown> = {
    'GET /v1/tpp/credentials': MOCK_TPP_CREDENTIALS,
    'GET /v1/tpp/credentials/pagopa': MOCK_PAGOPA_CREDENTIALS,
    'GET /v1/tpp': MOCK_ENDPOINT_PAGE,
    'POST /v1/tpp': { tppId: crypto.randomUUID() },
    'PUT /v1/tpp/credentials': MOCK_TPP_CREDENTIALS,
    'PATCH /v1/tpp': MOCK_ENDPOINT_PAGE,
};

const BASE_URL = `${CONFIG.API_BASE_URL}/api/`;


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



if (CONFIG.MOCK_ACTIVE) {
    axiosInstance.interceptors.request.use((config) => {
        applyMockScenario(config);

        const key = `${config.method?.toUpperCase()} ${config.url}`;
        if (MOCK_RESPONSES[key]) {
            config.adapter = () =>
                new Promise((resolve) =>
                    setTimeout(() => resolve({
                        data: MOCK_RESPONSES[key],
                        status: 200,
                        statusText: 'OK',
                        headers: {},
                        config,
                    }), 1000)
                );
        }
        return config;
    });
}

/**
 * Centralized HTTP error handling logic.
 *
 * Called both by the Axios interceptor (for real requests)
 * and by mock functions in scenarios.ts (for local testing),
 * ensuring both paths behave identically.
 *
 * @param error  - The AxiosError to handle
 * @param silent - If true, suppresses the generic toast for 5xx errors
 *                 (equivalent to the x-silent-error: true header in real requests)
 */
export function handleInterceptedError(error: AxiosError, silent = false): void {
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

        case 404: {
            const errorData = error.response?.data as { code?: string; message?: string } | undefined;
            const isTppNotFound =
                errorData?.code === 'NOT_FOUND' &&
                errorData?.message?.toLowerCase().startsWith('tpp not found');

            if (isTppNotFound) {
                localStorage.removeItem('tpp_registered');
                store.dispatch(setTppRegistered(false));
                store.dispatch(appStateActions.addError({
                    id: 'TPP_NOT_FOUND',
                    error: error,
                    techDescription: 'TPP not found',
                    blocking: false,
                    toNotify: true,
                    component: 'Toast',
                    displayableDescription: "La TPP non è più disponibile. Ripetere la registrazione o contattare l'assistenza",
                }));
            }
            break;
        }

        default:
            if (!status || status >= 500) {
                if (!silent) {
                    store.dispatch(appStateActions.addError({
                        id: `HTTP_${status ?? 'NETWORK'}`,
                        error: error,
                        techDescription: `HTTP ${status ?? 'network error'}`,
                        blocking: false,
                        toNotify: true,
                        component: 'Toast',
                        displayableDescription: 'Si è verificato un errore imprevisto. Riprova più tardi.',
                    }));
                }
            }
            break;
    }
}

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const silent = error.config?.headers?.['x-silent-error'] === 'true';
            handleInterceptedError(error, silent);
            return Promise.reject(error);
        }
        return Promise.reject(new Error(String(error)));
    }
);


