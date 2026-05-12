export type AuthenticationType = 'OAUTH2';

export interface VersionDetails {
    link: string;
}

export interface AgentLink {
    fallBackLink: string;
    versions: Record<string, VersionDetails>;
}

export interface TokenSection {
    contentType: string;
    bodyAdditionalProperties: Record<string, string>;
    pathAdditionalProperties?: Record<string, string>;
}

export interface TppDTO {
    entityId: string;
    businessName: string;
    messageUrl: string;
    authenticationUrl: string;
    authenticationType: AuthenticationType;
    tokenSection: TokenSection;
    pspDenomination: string;
    agentLinks: Record<string, AgentLink>;
}

export interface TppIdResponse {
    tppId: string;
}

// GET /tpp/credentials/pagopa
export interface PagoPACredentialsDTO {
    clientId: string;
    clientSecret: string;
    grantType: string;
}

// GET /tpp/endpoint
export interface EndpointLinkPageDto {
    messageUrl: string;
    authenticationUrl: string;
    authenticationType: AuthenticationType;
    agentLinks: Record<string, AgentLink>;
}