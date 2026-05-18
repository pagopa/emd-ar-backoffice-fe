import type { PagoPACredentialsDTO, TokenSection, TppDTO, TppResponse } from "../types/tpp";

export const MOCK_TPP_DTO: TppDTO = {
    entityId: 'mock-entity-001',
    businessName: 'Mock Business S.p.A.',
    messageUrl: 'https://mock.business.it/messages',
    authenticationUrl: 'https://mock.business.it/auth',
    authenticationType: 'OAUTH2',
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
    pspDenomination: "Mock Business S.p.A."
};

export const MOCK_ENDPOINT_PAGE: TppResponse = {
    tppId: 'mock-tpp-id',
    businessName: 'Mock Business',
    messageUrl: 'https://api.tpp.com/messages',
    authenticationUrl: 'https://api.tpp.com/auth',
    authenticationType: 'OAUTH2',
    agentLinks: {
        ANDROID: {
            fallBackLink: 'https://api.tpp.com/android/fallback',
            versions: {
                v1: { link: 'https://api.tpp.com/android' },
            },
        },
        IOS: {
            fallBackLink: 'https://api.tpp.com/ios/fallback',
            versions: {
                v1: { link: 'https://api.tpp.com/ios' },
                v2: { link: 'https://api2.tpp.com/ios' },
            },
        },
    },
};

export const MOCK_PAGOPA_CREDENTIALS: PagoPACredentialsDTO = {
    clientId: 'pagopa-client-id-mock',
    clientSecret: 'pagopa-secret-mock',
    grantType: 'client_credentials',
};

export const MOCK_TPP_CREDENTIALS: TokenSection = {
    contentType: 'application/x-www-form-urlencoded',
    bodyAdditionalProperties: {
        client_id: 'tpp-client-id-mock',
        client_secret: 'tpp-secret-mock',
        grant_type: 'client_credentials',
        scope: 'mock.scope',
        audience: 'mock-audience',
    },
    pathAdditionalProperties: {
        tenantId: 'mock-tenant-id',
    },
};