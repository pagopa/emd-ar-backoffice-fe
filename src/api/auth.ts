import { axiosInstance } from './axiosInstance';
import type { AcsResponse } from '../types/auth';
import { MOCK_RESPONSE } from '../mocks/auth';
import { CONFIG } from '../config';
import { getMockScenario, throwServerError } from '../mocks/scenarios';


export const acsHandshake = async (urlToken: string): Promise<AcsResponse> => {
    if (CONFIG.MOCK_ACTIVE) {
        const scenario = getMockScenario();
        if (scenario === 'auth-handshake-500') throwServerError();
        return MOCK_RESPONSE;
    }
    const { data } = await axiosInstance.post<AcsResponse>('/v1/auth/exchange', { token: urlToken });
    return data;
};