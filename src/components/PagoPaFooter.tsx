import { Box, Typography } from '@mui/material';
import { Footer as MuiItaliaFooter, type FooterLinksType, type CompanyLinkType, type PreLoginFooterLinksType, type LangCode } from '@pagopa/mui-italia';

const companyLink: CompanyLinkType = {
    ariaLabel: 'PagoPA S.p.A.',
    href: 'https://www.pagopa.it',
};

const postLoginLinks: Array<FooterLinksType> = [
    {
        label: 'Informativa Privacy',
        href: '#',
        ariaLabel: 'Informativa Privacy',
        linkType: 'internal',
    },
    {
        label: 'Diritto alla protezione dei dati personali',
        href: '#',
        ariaLabel: 'Diritto alla protezione dei dati personali',
        linkType: 'internal',
    },
    {
        label: 'Termini e condizioni d\'uso',
        href: '#',
        ariaLabel: 'Termini e condizioni d\'uso',
        linkType: 'internal',
    },
    {
        label: 'Accessibilità',
        href: '#',
        ariaLabel: 'Accessibilità',
        linkType: 'internal',
    },
];

const preLoginLinks: PreLoginFooterLinksType = {
    aboutUs: {
        title: "",
        links: [],
    },
    resources: {
        title: "",
        links: [],
    },
    followUs: {
        title: "",
        socialLinks: [],
        links: [],
    },
};

const legalInfo = (
    <Typography variant="caption" color="text.secondary">
        PagoPA S.p.A. · Società per azioni con socio unico · Capitale sociale di euro 1.000.000 interamente versato ·
        Sede legale in Roma, Piazza Colonna 370 · CAP 00187 · N. di iscrizione a Registro Imprese di Roma,
        CF e P.IVA 15376371009
    </Typography>
);


const Footer = () => (
    <Box sx={{ '& button[aria-label="lingua"]': { display: 'none' } }}>
        <MuiItaliaFooter
            companyLink={companyLink}
            postLoginLinks={postLoginLinks}
            preLoginLinks={preLoginLinks}
            loggedUser={true}
            legalInfo={legalInfo}
            languages={{ it: { it: 'Italiano' } }}
            currentLangCode="it"
            onLanguageChanged={(_newLang: LangCode) => undefined}
            hideProductsColumn={true}
        />
    </Box>
);

export default Footer;