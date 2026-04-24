import { axiosInstance } from './axiosInstance';
import type { AcsResponse } from '../types/auth';


export const acsHandshake = async (urlToken: string): Promise<AcsResponse> => {

    const { data } = await axiosInstance.post<AcsResponse>(
        '/v1/auth/exchange',
        { token: urlToken }
    );
    return data;
};