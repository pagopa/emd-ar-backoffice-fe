import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('CONFIG', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('mappa correttamente le variabili d\'ambiente', async () => {
        vi.stubEnv('VITE_ENV', 'test');
        vi.stubEnv('VITE_APPINSIGHTS_CONNECTION_STRING', 'test-connection-string');
        vi.stubEnv('VITE_API_BASE_URL', 'https://api.test.it');
        vi.stubEnv('VITE_MOCK_ACTIVE', 'true');
        vi.stubEnv('VITE_AR_BASE_URL', 'https://ar.test.it');
        vi.stubEnv('VITE_ASSISTANCE_EMAIL', 'assistenza@test.it');

        const { CONFIG } = await import('../config');

        expect(CONFIG.ENV).toBe('test');
        expect(CONFIG.APPINSIGHTS_CONNECTION_STRING).toBe('test-connection-string');
        expect(CONFIG.API_BASE_URL).toBe('https://api.test.it');
        expect(CONFIG.MOCK_ACTIVE).toBe(true);
        expect(CONFIG.AR_BASE_URL).toBe('https://ar.test.it');
        expect(CONFIG.ASSISTANCE_EMAIL).toBe('assistenza@test.it');
    });

    it('imposta MOCK_ACTIVE a false se VITE_MOCK_ACTIVE non è "true"', async () => {
        vi.stubEnv('VITE_MOCK_ACTIVE', 'false');
        const { CONFIG } = await import('../config');
        expect(CONFIG.MOCK_ACTIVE).toBe(false);
    });

    it('imposta MOCK_ACTIVE a false se VITE_MOCK_ACTIVE non è definita', async () => {
        vi.stubEnv('VITE_MOCK_ACTIVE', undefined);
        const { CONFIG } = await import('../config');
        expect(CONFIG.MOCK_ACTIVE).toBe(false);
    });

    it('espone i link statici corretti', async () => {
        const { CONFIG } = await import('../config');
        expect(CONFIG.LINKS.PAGOPA_COMPANY).toBe('https://www.pagopa.it');
        expect(CONFIG.LINKS.ACCESSIBILITY).toBe(
            'https://form.agid.gov.it/5N2TR557/selfcare/dichiarazione'
        );
    });

    it('espone la configurazione statica di ONE_TRUST', async () => {
        const { CONFIG } = await import('../config');
        expect(CONFIG.ONE_TRUST.STORAGE_CONTAINER_ID).toBe('77f17844-04c3-4969-a11d-462ee77acbe1');
        expect(CONFIG.ONE_TRUST.PRIVACY_NOTICE_ID).toBe('cbad5418-9923-4402-b2da-b8be62965da2');
        expect(CONFIG.ONE_TRUST.TERMS_AND_CONDITIONS_NOTICE_ID).toBe(
            '1a725d5c-4345-412c-9629-f76a0a4215f6'
        );
        expect(typeof CONFIG.ONE_TRUST.SETTINGS_TOKEN).toBe('string');
    });
});