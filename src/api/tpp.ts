import { axiosInstance } from './axiosInstance';
import { CONFIG } from '../config';
import type { TppDTO } from '../types/tpp';

const callMock = async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('[TPP] Mock save OK');
};

export const saveTpp = async (form: TppDTO): Promise<void> => {

    if (CONFIG.ENV === 'DEV') {
        return callMock();
    }

    try {
        await axiosInstance.post('/api/tpp/save', form);
    } catch (e) {
        console.warn('[TPP] Fallback su mock:', e);
    }

    await axiosInstance.post('/api/tpp/save', form);
};