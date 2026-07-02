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
import { useLocation, useNavigate } from 'react-router-dom';


const languages = {
    it: { it: 'Italiano', en: 'Inglese' },
    en: { it: 'Italian', en: 'English' },
} as Languages;

const Footer = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const currentLang = i18n.language as LangCode;

    const navigateToInternalRoute = (path: string) => () => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };


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


    const postLoginLinks: Array<FooterLinksType> = [
        {
            label: t('common.footer.postLoginLinks.privacyPolicy'),
            href: ROUTES.PRIVACY,
            ariaLabel: t('common.footer.postLoginLinks.privacyPolicy'),
            linkType: 'internal',
            onClick: navigateToInternalRoute(ROUTES.PRIVACY),
        },
        {
            label: t('common.footer.postLoginLinks.protectionofpersonaldata'),
            href: CONFIG.LINKS.PERSONAL_DATA_PROTECTION,
            ariaLabel: t('common.footer.postLoginLinks.protectionofpersonaldata'),
            linkType: 'internal',
        },
        {
            label: t('common.footer.postLoginLinks.termsandconditions'),
            href: CONFIG.LINKS.TERMS_AND_CONDITIONS,
            ariaLabel: t('common.footer.postLoginLinks.termsandconditions'),
            linkType: 'internal',
        },
        {
            label: t('common.footer.postLoginLinks.accessibility'),
            href: CONFIG.LINKS.ACCESSIBILITY,
            ariaLabel: t('common.footer.postLoginLinks.accessibility'),
            linkType: 'internal',
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
