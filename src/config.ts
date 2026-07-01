// Variabili d'ambiente iniettate a build-time da Vite (VITE_* in .env o tramite pipeline)

export const CONFIG = {
    ENV: import.meta.env.VITE_ENV,
    APPINSIGHTS_CONNECTION_STRING: import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING,
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    MOCK_ACTIVE: import.meta.env.VITE_MOCK_ACTIVE === 'true',
    AR_BASE_URL: import.meta.env.VITE_AR_BASE_URL,
    ASSISTANCE_EMAIL: import.meta.env.VITE_ASSISTANCE_EMAIL,

    LINKS: {
        PAGOPA_COMPANY: 'https://www.pagopa.it',
        OPERATIVE_MANUAL_AR: 'https://docs.pagopa.it/area-riservata',
        PERSONAL_DATA_PROTECTION: '#',
        TERMS_AND_CONDITIONS: '#',
        ACCESSIBILITY: '#',
    },

    ONE_TRUST: {
        SETTINGS_TOKEN:'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyIsImNvbnRlbnRBcGlVcmwiOiJodHRwczovL3ByaXZhY3lwb3J0YWwtZGUub25ldHJ1c3QuY29tL3JlcXVlc3QvdjEvZW50ZXJwcmlzZXBvbGljeS9kaWdpdGFscG9saWN5L2NvbnRlbnQiLCJtZXRhZGF0YUFwaVVybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9lbnRlcnByaXNlcG9saWN5L2RpZ2l0YWxwb2xpY3kvbWV0YS1kYXRhIn0=' , // NOSONAR
        STORAGE_CONTAINER_ID: '77f17844-04c3-4969-a11d-462ee77acbe1',
        PRIVACY_NOTICE_ID: 'cbad5418-9923-4402-b2da-b8be62965da2',
    },
};
