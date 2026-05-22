import { Box } from '@mui/material';

import { CONFIG } from '../../config';
import { useAppSelector } from '../../redux/hook';

import { HeaderAccount, HeaderProduct, type LinkType } from '@pagopa/mui-italia';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { storageTokenOps, storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';


const PagopaHeader = () => {
    const organization = useAppSelector((state) => state.organization.organization);
    const user = useAppSelector(userSelectors.selectLoggedUser);
    const { t } = useTranslation();

    const loggedUser = user
        ? {
            id: user.uid,
            name: user.name,
            surname: user.surname,
            email: user.email,
        } : false

    const partyList = organization
        ? [{
            id: organization.id,
            name: organization.name ?? '',
            productRole: organization.roles[0]?.role === 'admin'
                ? t('header.admin')
                : t('header.operator'),
        }]
        : [];

    const productsList = [{
        id: 'mdc-pagopa',
        title: 'Messaggi di Cortesia',
        productUrl: '',
        linkType: 'internal' as LinkType
    }]

    const handleLogout = () => {
        storageTokenOps.delete();
        storageUserOps.delete();
        localStorage.removeItem('acs_organization');
        localStorage.removeItem('acs_tpp_id');
        window.location.href = CONFIG.AR_BASE_URL + '/auth';
    };

    return (
        <Box component="header" sx={{
            backgroundColor: "white",
            '& .MuiAvatar-root': {
                backgroundColor: 'transparent',
            }
        }}>
            <HeaderAccount
                rootLink={{ title: '', label: 'PagoPA S.p.A.', href: 'https://www.pagopa.it', ariaLabel: 'PagoPA S.p.A.' }}
                loggedUser={loggedUser}
                onLogout={handleLogout}
                translationsMap={{
                    logOut: t('header.logout'),
                    assistance: t('header.assistance'),
                    documentation: t('header.documentation'),
                }}
                onDocumentationClick={i18n.language === 'it' ? () => undefined : undefined}

                onAssistanceClick={() => undefined}
            />
            <HeaderProduct
                productId="mdc-pagopa"
                productsList={productsList}
                partyId={organization?.id ?? ''}
                partyList={partyList}
                onSelectedParty={() => undefined}
                onSelectedProduct={() => undefined}
                borderBottom={0}
            />
        </Box>
    );
};

export default PagopaHeader;