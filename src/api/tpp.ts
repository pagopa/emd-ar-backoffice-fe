import { CONFIG } from '../config';
import { MOCK_CREDENTIALS_PAGE, MOCK_OVERVIEW } from '../mocks/tpp';
import type { CredentialsPageDTO, EndpoinLinkPageDto, SaveTppResponse, TokenSection, TppDTO } from '../types/tpp';
import { axiosInstance } from './axiosInstance';


//Mock of api call

const callMock = async (): Promise<SaveTppResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const tppId = crypto.randomUUID();
    return { tppId };
};


const callMockGetTpp = async (): Promise<CredentialsPageDTO> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_CREDENTIALS_PAGE;
};

const callMockGetOverview = async (): Promise<EndpoinLinkPageDto> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_OVERVIEW;
};


//TODO Call to be implemented

export const saveTpp = async (form: TppDTO): Promise<SaveTppResponse> => {

    const { data } = await axiosInstance.get(`/v1/tpp/test`);

    if (CONFIG.ENV === "DEV") {
        console.log("[TPP] form :", JSON.parse(JSON.stringify(form)))
        console.log("[TPP] resposnse :", JSON.parse(JSON.stringify(data)))
    }

    return callMock();
};


export const saveCredentialsTpp = async (form: TokenSection): Promise<SaveTppResponse> => {

    const { data } = await axiosInstance.get(`/v1/tpp/test`);

    if (CONFIG.ENV === "DEV") {
        console.log("[TPP] form :", JSON.parse(JSON.stringify(form)))
        console.log("[TPP] resposnse :", JSON.parse(JSON.stringify(data)))
    }

    return callMock();
};




export const getTppCredentials = async (): Promise<CredentialsPageDTO> => {

    return callMockGetTpp();
};

export const getOverview = async (): Promise<EndpoinLinkPageDto> => {
    return callMockGetOverview();
};