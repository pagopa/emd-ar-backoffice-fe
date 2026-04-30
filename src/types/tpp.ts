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

export type AuthenticationType = 'OAuth2';

export interface TppDTO {
    entityId: string;
    businessName: string;
    messageUrl: string;
    authenticationUrl: string;
    authenticationType: AuthenticationType;
    tokenSection: TokenSection;
    agentLinks: Record<string, AgentLink>;
}

export interface Credentials {
    clientId: string;
    clientSecret: string;
    grantType: string;
}

export interface AdditionalParams {
    bodyParams: Record<string, string>;
    pathParams?: Record<string, string>;
}

export interface CredentialsPageDTO {
    tppId: string;
    pagoPaCredentials: Credentials;
    tppCredentials: Credentials;
    additionalParams: AdditionalParams;
}

export interface EndpoinLinkPageDto {
    messageUrl: string;
    authenticationUrl: string;
    authenticationType: AuthenticationType;
    agentLinks: Record<string, AgentLink>;
}

export interface SaveTppResponse {
    tppId: string;
}