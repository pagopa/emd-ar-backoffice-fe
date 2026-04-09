
export interface Step1Values {
    ragioneSociale: string;
    partitaIva: string;
    sedeLegale: string;
    codiceIdentificativoPSP: string;
    nomeReferente: string;
    emailReferente: string;
    telefonoReferente: string;
}


export interface Step2Values {
    endpointProduzione: string;
    endpointCollaudo: string;
    timeoutConnessione: string;
    abilitaNotifiche: boolean;
    urlCallback: string;
}

export interface Step3Values {
    clientId: string;
    clientSecret: string;
    apiKey: string;
    certificato: string;
}
