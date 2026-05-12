export interface VersionEntry {
    versionKey: string;
    link: string;
}

export interface DeviceLink {
    so: 'ANDROID' | 'IOS' | 'WEB';
    fallBackLink: string;
    versions: VersionEntry[];
}

export interface Step1Values {
    webhookUrl: string;
    authUrl: string;
    authType: string;
    deepLinkType: 'universale' | 'specifico';
    deepLinkUniversale: {
        fallBackLink: string;
        versions: VersionEntry[];
    };
    deepLinkDevices: DeviceLink[];
}

export interface ParamEntry {
    name: string;
    value: string;
}

export interface Step2Values {
    clientId: string;
    clientSecret: string;
    grantType: string;
    bodyParams: ParamEntry[];
    urlParams: ParamEntry[];
}