import { axiosInstance } from './axiosInstance';
import type { AcsResponse } from '../types/auth';
import { MOCK_RESPONSE } from '../mocks/auth';
import { CONFIG } from '../config';


export const acsHandshake = async (urlToken: string): Promise<AcsResponse> => {
    if (CONFIG.MOCK_ACTIVE) return MOCK_RESPONSE;
    console.log("test")
    const { data } = await axiosInstance.post<AcsResponse>('/v1/auth/exchange', { token: urlToken });
    return data;
};