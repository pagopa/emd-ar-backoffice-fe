import type { CredentialsPageDTO, TppDTO } from "../types/tpp";

export const MOCK_TPP_DTO: TppDTO = {
    entityId: 'mock-entity-001',
    businessName: 'Mock Business S.p.A.',
    messageUrl: 'https://mock.business.it/messages',
    authenticationUrl: 'https://mock.business.it/auth',
    authenticationType: 'OAuth2',
    tokenSection: {
        contentType: 'application/x-www-form-urlencoded',
        bodyAdditionalProperties: {
            grant_type: 'client_credentials',
            scope: 'mock.scope',
        },
        pathAdditionalProperties: {
            tenantId: 'mock-tenant-id',
        },
    },
    agentLinks: {
        mockAgent: {
            fallBackLink: 'https://mock.business.it/agent/fallback',
            versions: {
                v1: {
                    link: 'https://mock.business.it/agent/v1',
                },
                v2: {
                    link: 'https://mock.business.it/agent/v2',
                },
            },
        },
    },
};

export const MOCK_CREDENTIALS_PAGE: CredentialsPageDTO = {
    tppId: 'mock-entity-001',
    pagoPaCredentials: {
        clientId: 'pagopa-client-id-mock',
        clientSecret: 'pagopa-secret-mock',
        grantType: 'client_credentials',
    },
    tppCredentials: {
        clientId: 'tpp-client-id-mock',
        clientSecret: 'tpp-secret-mock',
        grantType: 'client_credentials',
    },
    additionalParams: {
        bodyParams: {
            scope: 'mock.scope',
            audience: 'mock-audience',
        },
        pathParams: {
            tenantId: 'mock-tenant-id',
        },
    },
};