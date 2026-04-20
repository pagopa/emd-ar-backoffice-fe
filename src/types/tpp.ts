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
    messageUrl: string;
    authenticationUrl: string;
    authenticationType: AuthenticationType;
    tokenSection: TokenSection;
    agentLinks: Record<string, AgentLink>;
}