import { axiosInstance } from './axiosInstance';
import { CONFIG } from '../config';
import type { AcsResponse } from '../types/auth';
import { MOCK_RESPONSE } from '../mocks/auth';


const callMock = async (): Promise<AcsResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_RESPONSE;
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
            return data;
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