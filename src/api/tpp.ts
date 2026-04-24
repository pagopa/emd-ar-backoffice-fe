import { axiosInstance } from './axiosInstance';
import type { TppDTO } from '../types/tpp';
import { CONFIG } from '../config';

interface SaveTppResponse {
    tppId: string;
}

const callMock = async (): Promise<SaveTppResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const tppId = crypto.randomUUID();
    return { tppId };
};

export const saveTpp = async (form: TppDTO): Promise<SaveTppResponse> => {

    const { data } = await axiosInstance.get(`/v1/tpp/test`);

    if (CONFIG.ENV === "DEV") {
        console.log("[TPP] form :", JSON.parse(JSON.stringify(form)))
        console.log("[TPP] resposnse :", JSON.parse(JSON.stringify(data)))
    }

    return callMock();
};