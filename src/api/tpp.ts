import axios from 'axios';
import { CONFIG } from '../config';
import { MOCK_ENDPOINT_PAGE, MOCK_PAGOPA_CREDENTIALS, MOCK_TPP_CREDENTIALS } from '../mocks/tpp';
import type { EndpointLinkPageDto, PagoPACredentialsDTO, TokenSection, TppDTO, TppIdResponse, TppResponse } from '../types/tpp';
import { axiosInstance } from './axiosInstance';

// --- Mocks ---

const mockDelay = <T>(value: T): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(value), 1000));

const callMockSave = (): Promise<TppIdResponse> =>
    mockDelay({ tppId: crypto.randomUUID() });


// --- API ---

export const saveTpp = async (form: TppDTO): Promise<TppIdResponse> => {
    if (CONFIG.MOCK_ACTIVE) return callMockSave();
    const { data } = await axiosInstance.post<TppIdResponse>('/v1/tpp', form);
    return data;
};

export const saveCredentialsTpp = async (form: TokenSection): Promise<TokenSection> => {
    if (CONFIG.MOCK_ACTIVE) return mockDelay(MOCK_TPP_CREDENTIALS);
    const { data } = await axiosInstance.put<TokenSection>('/v1/tpp/credentials', form);
    return data;
};

export const saveEndpointTpp = async (form: EndpointLinkPageDto): Promise<TppIdResponse> => {
    if (CONFIG.ENV === "DEV" || CONFIG.MOCK_ACTIVE) return callMockSave();
    const { data } = await axiosInstance.post<TppIdResponse>('/v1/tpp/endpoint', form);
    return data;
};

export const getTppCredentials = async (): Promise<TokenSection> => {
    if (CONFIG.MOCK_ACTIVE) return mockDelay(MOCK_TPP_CREDENTIALS);
    const { data } = await axiosInstance.get<TokenSection>('/v1/tpp/credentials', {
        headers: { 'x-silent-error': 'true' }
    });
    return data;
};

export const getPagoPACredentials = async (): Promise<PagoPACredentialsDTO> => {
    if (CONFIG.MOCK_ACTIVE) return mockDelay(MOCK_PAGOPA_CREDENTIALS);
    const { data } = await axiosInstance.get<PagoPACredentialsDTO>('/v1/tpp/credentials/pagopa', {
        headers: { 'x-silent-error': 'true' }
    });
    return data;
};


export const getTppProfile = async (): Promise<TppResponse | null> => {
    if (CONFIG.MOCK_ACTIVE) {
        return mockDelay(MOCK_ENDPOINT_PAGE)
    };
    try {
        const { data } = await axiosInstance.get<TppResponse>('/v1/tpp',
            {
                headers: { 'x-silent-error': 'true' }
            });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) return null;
        throw error;
    }
};