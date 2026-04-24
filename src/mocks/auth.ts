import type { AcsResponse } from "../types/auth";

export const MOCK_TOKEN = [
    btoa(JSON.stringify({ alg: 'none' })),
    btoa(JSON.stringify({
        uid: 'mock-123',
        sub: 'mock-123',
        name: 'Mario',
        familyName: 'Rossi',
        email: 'mario.rossi@test.it',
        exp: Math.floor(Date.now() / 1000) + 3600,
    })),
    'mock-signature',
].join('.');

export const MOCK_RESPONSE: AcsResponse = {
    token: MOCK_TOKEN,
    userInfo: {
        uid: 'mock-123',
        name: 'Mario',
        familyName: 'Rossi',
        email: 'mario.rossi@test.it',
        organization: { 
            id: 'mock-123',
            ipaCode: 'mock-ipa',
            name: 'MDC Test',
            fiscalCode: '23324453455',
            roles: [{ partyRole: 'DELEGATE', role: 'admin' }],
        },
    },
};