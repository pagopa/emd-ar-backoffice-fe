import { axiosInstance } from './axiosInstance';
import { CONFIG } from '../config';
import type { TppDTO } from '../types/tpp';

interface SaveTppResponse {
    tppId: string;
}

const callMock = async (): Promise<SaveTppResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const tppId = crypto.randomUUID();
    console.log('[TPP] Mock save OK, tppId:', tppId);
    return { tppId };
};

export const saveTpp = async (form: TppDTO): Promise<SaveTppResponse> => {
    return callMock();

    if (CONFIG.ENV === 'DEV') {
        try {
            const { data } = await axiosInstance.post<SaveTppResponse>('/api/tpp/save', form);
            return data;
        } catch (e) {
            console.warn('[TPP] Fallback su mock:', e);
            return callMock();
        }
    }

    const { data } = await axiosInstance.post<SaveTppResponse>('/api/tpp/save', form);
    return data;
};