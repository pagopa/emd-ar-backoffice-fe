import axios from 'axios';
import { CONFIG } from '../config';
import { MOCK_CREDENTIALS_PAGE, MOCK_ENDPOINT_PAGE } from '../mocks/tpp';
import type { CredentialsPageDTO, EndpoinLinkPageDto, TppIdResponse, TokenSection, TppDTO } from '../types/tpp';
import { axiosInstance } from './axiosInstance';


//Mock of api call
const callMock = async (): Promise<TppIdResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const tppId = crypto.randomUUID();
    return { tppId };
};


const callMockGetTppCredentials = async (): Promise<CredentialsPageDTO> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_CREDENTIALS_PAGE;
};

const callMockGetTppEnpoint = async (): Promise<EndpoinLinkPageDto> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_ENDPOINT_PAGE;
};


export const saveTpp = async (form: TppDTO): Promise<TppIdResponse> => {
    if (CONFIG.MOCK_ACTIVE) {
        console.log('[TPP][MOCK] saveTpp:', form);
        return callMock();
    }
    const { data } = await axiosInstance.post<TppIdResponse>('/v1/tpp', form);
    return data;
};


//TODO Call to be implemented
export const saveCredentialsTpp = async (form: TokenSection): Promise<TppIdResponse> => {
    if (CONFIG.ENV === "DEV" || CONFIG.MOCK_ACTIVE) {
        console.log('[TPP][MOCK] saveCredentialsTpp:', form);
        return callMock();
    }
    const { data } = await axiosInstance.post<TppIdResponse>('/v1/tpp/credentials', form);
    return data;
};


//TODO Call to be implemented
export const saveEndpointTpp = async (form: EndpoinLinkPageDto): Promise<TppIdResponse> => {
    if (CONFIG.ENV === "DEV" || CONFIG.MOCK_ACTIVE) {
        console.log('[TPP][MOCK] saveEndpointTpp:', form);
        return callMock();
    }
    const { data } = await axiosInstance.post<TppIdResponse>('/v1/tpp/endpoint', form);
    return data;
};


//TODO Call to be implemented
export const getTppCredentials = async (): Promise<CredentialsPageDTO> => {
    if (CONFIG.ENV === "DEV" || CONFIG.MOCK_ACTIVE) return callMockGetTppCredentials();
    const { data } = await axiosInstance.get<CredentialsPageDTO>('/v1/tpp/credentials');
    return data;
};


//TODO Call to be implemented
export const getTppEndpoint = async (): Promise<EndpoinLinkPageDto> => {
    if (CONFIG.ENV === "DEV" || CONFIG.MOCK_ACTIVE) return callMockGetTppEnpoint();
    const { data } = await axiosInstance.get<EndpoinLinkPageDto>('/v1/tpp/endpoint');
    return data;
};


export const getTppByEntityId = async (): Promise<TppIdResponse | null> => {
    if (CONFIG.MOCK_ACTIVE) {
        return { tppId: 'mock-tpp-id-00000000-0000-0000-0000-000000000000-1706867960900' };
    }
    try {
        const { data } = await axiosInstance.get<TppIdResponse>(`/v1/tpp`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};