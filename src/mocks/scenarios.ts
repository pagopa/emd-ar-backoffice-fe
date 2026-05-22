/* eslint-disable no-console */
// Mock Scenarios — active only when VITE_MOCK_ACTIVE=true
//
// Usage:
//   localStorage.setItem('mock_scenario', 'session-401')  ← reload to apply
//   localStorage.removeItem('mock_scenario')              ← back to normal flow

import { AxiosError } from 'axios';
import { handleInterceptedError } from '../api/axiosInstance';

export type MockScenario =
    | 'auth-handshake-500'    // acsHandshake → 500
    | 'auth-check-500'        // handshake ok, checkTppExists → 500
    | 'auth-no-tpp'           // handshake ok, checkTppExists → null → Onboarding
    | 'session-401'           // any request → 401 → "Session expired" dialog
    | 'session-403'           // any request → 403 → "Access denied" dialog
    | 'fetch-500'             // getTppProfile → 500 → ErrorContent
    | 'tpp-deleted'           // getTppProfile → 404 TPP_NOT_FOUND → toast + redirect
    | 'init-check-500';       // checkTppExists in useInitSession → 500 → ErrorContent

export function getMockScenario(): MockScenario | null {
    return (localStorage.getItem('mock_scenario') as MockScenario) ?? null;
}

export function makeMockAxiosError(status: number, data: unknown = {}): AxiosError {
    const response = {
        status,
        data,
        headers: {},
        config: { headers: {} as never },
        statusText: String(status),
    };
    return new AxiosError(
        `Mock error ${status}`,
        String(status),
        { headers: {} as never },
        null,
        response as never
    );
}

// Each throw* passes the error through handleInterceptedError so mock behaviour
// matches real calls: same Redux dispatch, same toast, same dialog.
// `silent` suppresses the generic 5xx toast (use for data-fetch GETs showing ErrorContent).

export function throwUnauthorized(): never {
    const err = makeMockAxiosError(401, { message: 'Unauthorized' });
    handleInterceptedError(err);
    throw err;
}

export function throwForbidden(): never {
    const err = makeMockAxiosError(403, { message: 'Forbidden' });
    handleInterceptedError(err);
    throw err;
}

export function throwTppNotFound(): never {
    const err = makeMockAxiosError(404, { code: 'NOT_FOUND', message: 'tpp not found' });
    handleInterceptedError(err);
    throw err;
}

export function throwServerError(silent = false): never {
    const err = makeMockAxiosError(500, { message: 'Internal Server Error' });
    handleInterceptedError(err, silent);
    throw err;
}

// Called automatically when MOCK_ACTIVE=true (on main.tsx).
export function printMockHelp(): void {
    console.group('%c[MockScenarios] Available scenarios', 'color: #7c3aed; font-weight: bold');
    const scenarios: Array<[MockScenario, string]> = [
        ['auth-handshake-500', 'Auth: handshake fails → error page'],
        ['auth-no-tpp',        'Auth: handshake ok, TPP not found → Onboarding'],
        ['session-401',        'Any request → "Session expired" dialog'],
        ['session-403',        'Any request → "Access denied" dialog'],
        ['fetch-500',          'Home/Credentials: data fetch → ErrorContent (silent)'],
        ['tpp-deleted',        'Home: getTppProfile 404 → toast + redirect Onboarding'],
        ['init-check-500',     'Reload: checkTppExists 500 → ErrorContent'],
    ];
    scenarios.forEach(([key, desc]) => {
        console.log(
            `%c localStorage.setItem('mock_scenario', '${key}')`,
            'font-family: monospace; color: #0369a1',
            `← ${desc}`
        );
    });
    console.log('%c localStorage.removeItem(\'mock_scenario\')', 'font-family: monospace; color: #64748b', '← normal flow');
    console.groupEnd();
}