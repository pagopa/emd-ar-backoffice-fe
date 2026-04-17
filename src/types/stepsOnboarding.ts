// types/stepsOnboarding.ts
export interface Step1Values {
    webhookUrl: string;
    authUrl: string;
    authType: 'OAuth2';
    deepLinkEnabled: boolean;
    deepLinkType: 'universale' | 'specifico';
    deepLinkVersions: Array<DeepLinkVersion>;
}


export interface DeepLinkVersion {
        so: 'ANDROID' | 'IOS';
        version?: string;
        urlRedirect: string;
    }

export interface Step2Values {
    clientId: string;
    clientSecret: string;
    grantType: 'client_credentials';
}