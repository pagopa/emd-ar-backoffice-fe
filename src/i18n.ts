import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import selfcareIt from '@pagopa/selfcare-common-frontend/lib/locale/it';
import selfcareEn from '@pagopa/selfcare-common-frontend/lib/locale/en';

import customIt from './locales/it';
import customEn from './locales/en';

void i18n
    .use(initReactI18next)
    .init({
        resources: {
            it: { translation: { ...selfcareIt, ...customIt } }, 
            en: { translation: { ...selfcareEn, ...customEn } },
        },
        lng: 'it',
        fallbackLng: 'it',
        interpolation: { escapeValue: false },
    });

export default i18n;