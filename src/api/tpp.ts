import { axiosInstance } from './axiosInstance';
import type { TokenSection, PagoPACredentialsDTO, TppResponse, TppDTO, TppIdResponse, EndpointLinkPageDto } from '../types/tpp';
import axios from 'axios';

export const getTppCredentials = async (): Promise<TokenSection> => {
    const { data } = await axiosInstance.get<TokenSection>('/v1/tpp/credentials', {
        headers: { 'x-silent-error': 'true' },
    });
    return data;
};

export const getPagoPACredentials = async (): Promise<PagoPACredentialsDTO> => {
    const { data } = await axiosInstance.get<PagoPACredentialsDTO>('/v1/tpp/credentials/pagopa', {
        headers: { 'x-silent-error': 'true' },
    });
    return data;
};

export const getTppProfile = async (): Promise<TppResponse> => {
    const { data } = await axiosInstance.get<TppResponse>('/v1/tpp', {
        headers: { 'x-silent-error': 'true' },
    });
    return data;
};

export const checkTppExists = async (): Promise<TppResponse | null> => {
    try {
        const { data } = await axiosInstance.get<TppResponse>('/v1/tpp', {
            headers: { 'x-silent-error': 'true' },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) return null;
        throw error;
    }
};

export const saveTpp = async (form: TppDTO): Promise<TppIdResponse> => {
    const { data } = await axiosInstance.post<TppIdResponse>('/v1/tpp', form);
    return data;
};

export const saveCredentialsTpp = async (form: TokenSection): Promise<TokenSection> => {
    const { data } = await axiosInstance.put<TokenSection>('/v1/tpp/credentials', form);
    return data;
};

export const saveEndpointTpp = async (form: Partial<EndpointLinkPageDto>): Promise<TppResponse> => {
    const { data } = await axiosInstance.patch<TppResponse>('/v1/tpp', form);
    return data;
};