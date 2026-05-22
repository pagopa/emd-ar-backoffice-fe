import { useTranslation } from 'react-i18next';

import {
    type CompanyLinkType,
    Footer as MuiItaliaFooter,
    type FooterLinksType,
    type LangCode,
    type PreLoginFooterLinksType,
    type Languages,
} from '@pagopa/mui-italia';

const companyLink: CompanyLinkType = {
    ariaLabel: 'PagoPA S.p.A.',
    href: 'https://www.pagopa.it',
};

const preLoginLinks: PreLoginFooterLinksType = {
    aboutUs: {
        title: '',
        links: [],
    },
    resources: {
        title: '',
        links: [],
    },
    followUs: {
        title: '',
        socialLinks: [],
        links: [],
    },
};

const legalInfo = (
    <>
        <strong>PagoPA S.p.A.</strong>
        {' '}· Società per azioni con socio unico · Capitale sociale di euro 1.000.000 interamente versato ·
        Sede legale in Roma, Piazza Colonna 370,{' '}
        <br />
        CAP 00187 · N. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009
    </>
);


const languages = {
    it: { it: 'Italiano', en: 'Inglese' },
    en: { it: 'Italian', en: 'English' },
} as Languages;

const Footer = () => {
    const { t, i18n } = useTranslation();

    const currentLang = i18n.language as LangCode;

    const postLoginLinks: Array<FooterLinksType> = [
        {
            label: t('common.footer.postLoginLinks.privacyPolicy'),
            href: '#',
            ariaLabel: t('common.footer.postLoginLinks.privacyPolicy'),
            linkType: 'internal',
        },
        {
            label: t('common.footer.postLoginLinks.protectionofpersonaldata'),
            href: '#',
            ariaLabel: t('common.footer.postLoginLinks.protectionofpersonaldata'),
            linkType: 'internal',
        },
        {
            label: t('common.footer.postLoginLinks.termsandconditions'),
            href: '#',
            ariaLabel: t('common.footer.postLoginLinks.termsandconditions'),
            linkType: 'internal',
        },
        {
            label: t('common.footer.postLoginLinks.accessibility'),
            href: '#',
            ariaLabel: t('common.footer.postLoginLinks.accessibility'),
            linkType: 'internal',
        },
    ];

    const handleLanguageChange = (newLang: LangCode) => {
        void i18n.changeLanguage(newLang);
    };

    return (
        <MuiItaliaFooter
            companyLink={companyLink}
            postLoginLinks={postLoginLinks}
            preLoginLinks={preLoginLinks}
            loggedUser={true}
            legalInfo={legalInfo}
            languages={languages}
            currentLangCode={currentLang}
            onLanguageChanged={handleLanguageChange}
            hideProductsColumn={true}
        />
    );
};

export default Footer;
