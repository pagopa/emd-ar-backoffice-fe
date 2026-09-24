import { Trans, useTranslation } from 'react-i18next';

import {
    type CompanyLinkType,
    Footer as MuiItaliaFooter,
    type FooterLinksType,
    type LangCode,
    type PreLoginFooterLinksType,
    type Languages,
} from '@pagopa/mui-italia';
import { CONFIG } from '../../config';
import { LANG_STORAGE_KEY } from '../../utils/constant';
import ROUTES from '../../routes';


const languages = {
    it: { it: 'Italiano', en: 'Inglese' },
    en: { it: 'Italian', en: 'English' },
} as Languages;

const Footer = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language as LangCode;


    const legalInfo = (
        <Trans
            i18nKey="footer.legalInfo"
            components={{
                strong: <strong />,
                br: <br />,
            }}
        />
    );

    const companyLink: CompanyLinkType = {
        ariaLabel: 'PagoPA S.p.A.',
        href: CONFIG.LINKS.PAGOPA_COMPANY,
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

    const openInNewTab = (href: string) => () => {
        window.open(href, '_blank', 'noopener,noreferrer');
    };

    const toAbsolute = (path: string) => `${window.location.origin}${path}`;

    const postLoginLinks: Array<FooterLinksType> = [
        {
            label: t('common.footer.postLoginLinks.privacyPolicy'),
            href: toAbsolute(ROUTES.PRIVACY),
            ariaLabel: t('common.footer.postLoginLinks.privacyPolicy'),
            linkType: 'external',
            onClick: openInNewTab(toAbsolute(ROUTES.PRIVACY)),
        },
        {
            label: t('common.footer.postLoginLinks.protectionofpersonaldata'),
            href: CONFIG.LINKS.PERSONAL_DATA_PROTECTION,
            ariaLabel: t('common.footer.postLoginLinks.protectionofpersonaldata'),
            linkType: 'external',
            onClick: openInNewTab(CONFIG.LINKS.PERSONAL_DATA_PROTECTION),
        },
        {
            label: t('common.footer.postLoginLinks.termsandconditions'),
            href: toAbsolute(ROUTES.TERMS_AND_CONDITIONS),
            ariaLabel: t('common.footer.postLoginLinks.termsandconditions'),
            linkType: 'external',
            onClick: openInNewTab(toAbsolute(ROUTES.TERMS_AND_CONDITIONS)),
        },
        {
            label: t('common.footer.postLoginLinks.accessibility'),
            href: CONFIG.LINKS.ACCESSIBILITY,
            ariaLabel: t('common.footer.postLoginLinks.accessibility'),
            linkType: 'external',
            onClick: openInNewTab(CONFIG.LINKS.ACCESSIBILITY),
        },
    ];

    const handleLanguageChange = (newLang: LangCode) => {
        void i18n.changeLanguage(newLang);
        localStorage.setItem(LANG_STORAGE_KEY, newLang);
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
