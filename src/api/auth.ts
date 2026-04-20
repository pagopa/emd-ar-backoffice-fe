import { axiosInstance } from './axiosInstance';
import { CONFIG } from '../config';
import type { AcsResponse } from '../types/auth';

const MOCK_INNER_TOKEN = [
    btoa(JSON.stringify({ alg: 'none' })),
    btoa(JSON.stringify({
        uid: 'mock-123',
        sub: 'mock-123',
        role: 'user',
        name: 'TPP name',
        CF: 'AAABBB41D16F205I',
        sede: 'Milano',
        exp: Math.floor(Date.now() / 1000) + 3600,
    })),
    'mock-signature',
].join('.');

const callMock = async (): Promise<AcsResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { status: 'success', message: 'Mock OK', token: MOCK_INNER_TOKEN };
};

export const acsHandshake = async (urlToken: string): Promise<AcsResponse> => {

    if (CONFIG.ENV === 'DEV') {
        try {
            const { data } = await axiosInstance.post<AcsResponse>(
                '/api/auth/pagopa',
                { token: urlToken },
                { headers: { Authorization: `Bearer ${urlToken}` } }
            );
            console.log('[ACS] Risposta BFF:', data);
            return callMock();
        } catch (e) {
            console.warn('[ACS] Fallback su mock:', e);
            return callMock();
        }
    }

    const { data } = await axiosInstance.post<AcsResponse>(
        '/api/auth/pagopa',
        { token: urlToken },
        { headers: { Authorization: `Bearer ${urlToken}` } }
    );
    
    return data;
};