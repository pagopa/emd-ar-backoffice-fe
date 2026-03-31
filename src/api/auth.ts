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

export const acsHandshake = async (urlToken: string): Promise<AcsResponse> => {
    if (CONFIG.MOCK_ACTIVE === 'true') {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return { status: 'success', message: 'Mock OK', token: MOCK_INNER_TOKEN };
    }

    const { data } = await axios.post<AcsResponse>(
        `${CONFIG.API_BASE_URL}/auth/pagopa`,
        { token: urlToken }
    );

    return data;
};