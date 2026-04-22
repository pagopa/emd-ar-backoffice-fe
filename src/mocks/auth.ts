import type { AcsResponse } from "../types/auth";

export const MOCK_TOKEN = [
    btoa(JSON.stringify({ alg: 'none' })),
    btoa(JSON.stringify({
        uid: 'mock-123',
        sub: 'mock-123',
        name: 'Mario',
        family_name: 'Rossi',
        email: 'mario.rossi@test.it',
        exp: Math.floor(Date.now() / 1000) + 3600,
    })),
    'mock-signature',
].join('.');

export const MOCK_RESPONSE: AcsResponse = {
    status: 'success',
    message: 'Mock OK',
    token: MOCK_TOKEN,
    userInfo: {
        uid: 'mock-123',
        name: 'Mario',
        family_name: 'Rossi',
        email: 'mario.rossi@test.it'
    },
    organizationInfo: {
        fiscal_code: '23324453455',
        id: 'mock-123',
        name: 'MDC Test',
        roles: [{ partyRole: 'DELEGATE', role: 'admin' }],
    },
};