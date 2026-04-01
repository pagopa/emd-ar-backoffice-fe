import { CONFIG } from '../config';
import { type AcsResponse } from '../types/auth';
import axios from 'axios';

const MOCK_INNER_TOKEN = [
    btoa(JSON.stringify({ alg: 'none' })),
    btoa(JSON.stringify({
        uid: 'mock-123',
        sub: 'mock-123',
        role: 'user',
        name: 'TPP name',
        exp: Math.floor(Date.now() / 1000) + 3600,
    })),
    'mock-signature',
].join('.');

const callMock = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { status: 'success', message: 'Mock OK', token: MOCK_INNER_TOKEN } as AcsResponse;
}

export const acsHandshake = async (urlToken: string): Promise<AcsResponse> => {

    if (CONFIG.ENV === 'DEV') {
        try {
            const { data } = await axios.post<AcsResponse>(
                `${CONFIG.API_BASE_URL}/api/auth/pagopa`,
                { token: urlToken },
                {
                    headers: {
                        Authorization: `Bearer ${urlToken}`,
                    }
                }
            );

            console.log("Dati chiamata BFF: ", data);
            return callMock()

        } catch (e) {
            console.warn("Chiamata BFF fallita, fallback su mock:", e);
            return callMock()
        }
    }

    const { data } = await axios.post<AcsResponse>(
        `${CONFIG.API_BASE_URL}/api/auth/pagopa`,
        { token: urlToken },
        {
            headers: {
                Authorization: `Bearer ${urlToken}`,
            }
        }
    );

    return data;
};