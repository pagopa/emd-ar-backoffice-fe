import { CONFIG } from '../config';
import { MOCK_CREDENTIALS_PAGE, MOCK_ENDPOINT_PAGE } from '../mocks/tpp';
import type { CredentialsPageDTO, EndpoinLinkPageDto, SaveTppResponse, TokenSection, TppDTO } from '../types/tpp';
import { axiosInstance } from './axiosInstance';


//Mock of api call

const callMock = async (): Promise<SaveTppResponse> => {
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


//TODO Call to be implemented

export const saveTpp = async (form: TppDTO): Promise<SaveTppResponse> => {
    if (CONFIG.MOCK_ACTIVE) {
        console.log('[TPP][MOCK] saveTpp:', form);
        return callMock();
    }
    const { data } = await axiosInstance.post<SaveTppResponse>('/v1/tpp', form);
    return data;
};


export const saveCredentialsTpp = async (form: TokenSection): Promise<SaveTppResponse> => {
    if (CONFIG.MOCK_ACTIVE) {
        console.log('[TPP][MOCK] saveCredentialsTpp:', form);
        return callMock();
    }
    const { data } = await axiosInstance.post<SaveTppResponse>('/v1/tpp/credentials', form);
    return data;
};


export const saveEndpointTpp = async (form: EndpoinLinkPageDto): Promise<SaveTppResponse> => {
    if (CONFIG.MOCK_ACTIVE) {
        console.log('[TPP][MOCK] saveEndpointTpp:', form);
        return callMock();
    }
    const { data } = await axiosInstance.post<SaveTppResponse>('/v1/tpp/endpoint', form);
    return data;
};


export const getTppCredentials = async (): Promise<CredentialsPageDTO> => {
    if (CONFIG.MOCK_ACTIVE) return callMockGetTppCredentials();
    const { data } = await axiosInstance.get<CredentialsPageDTO>('/v1/tpp/credentials');
    return data;
};


export const getTppEndpoint = async (): Promise<EndpoinLinkPageDto> => {
    if (CONFIG.MOCK_ACTIVE) return callMockGetTppEnpoint();
    const { data } = await axiosInstance.get<EndpoinLinkPageDto>('/v1/tpp/endpoint');
    return data;
};