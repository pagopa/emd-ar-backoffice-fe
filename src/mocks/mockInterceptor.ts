/* eslint-disable no-fallthrough */

// Axios interceptor active only when VITE_MOCK_ACTIVE=true.
// Reads mock_scenario from localStorage and simulates the corresponding
// response without touching any API code.
import type { InternalAxiosRequestConfig } from 'axios';
import { getMockScenario , throwForbidden, throwServerError, throwTppNotFound, throwUnauthorized } from './scenarios';


type RoutePattern = {
    method?: string;         // 'get' | 'post' | 'put' | 'patch' — undefined = qualsiasi
    urlIncludes?: string;    // URL substring
};

function matches(config: InternalAxiosRequestConfig, pattern: RoutePattern): boolean {
    const methodOk = !pattern.method || config.method?.toLowerCase() === pattern.method;
    const urlOk = (!pattern.urlIncludes || config.url?.includes(pattern.urlIncludes)) ?? false;
    return methodOk && urlOk;
}

/**
 * Applies the mock scenario to the current request.
 * Throws (never returns) if the scenario should block it,
 * otherwise returns undefined and the request proceeds normally.
 */
export function applyMockScenario(config: InternalAxiosRequestConfig): void {
    const scenario = getMockScenario();
    if (!scenario) return;

    const isDataFetch = matches(config, { method: 'get' });

    switch (scenario) {
        case 'session-401':
            throwUnauthorized();

        case 'session-403':
            throwForbidden();

        case 'fetch-500':
            if (isDataFetch) throwServerError(true);
            break;

        case 'tpp-deleted':
            if (matches(config, { method: 'get', urlIncludes: '/v1/tpp' }))
                throwTppNotFound();
            break;

        case 'auth-handshake-500':
        case 'auth-check-500':
        case 'auth-no-tpp':
        case 'init-check-500':
            break;
    }
}