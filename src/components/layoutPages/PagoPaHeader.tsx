import { HeaderAccount, HeaderProduct } from '@pagopa/mui-italia';
import { Box } from '@mui/material';
import { useAppSelector } from '../../redux/hook';
import { CONFIG } from '../../config';
import { storageTokenOps, storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';


const Header = () => {
    const organization = useAppSelector((state) => state.organization.organization);
    const user = useAppSelector(userSelectors.selectLoggedUser);

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
            productRole: organization.roles[0]?.role === 'admin' ? 'Amministratore' : 'Operatore',
        }]
        : [];

    const handleLogout = () => {
        storageTokenOps.delete();
        storageUserOps.delete();
        localStorage.removeItem('acs_organization');
        localStorage.removeItem('acs_tpp_id');
        window.location.href = CONFIG.AR_BASE_URL + '/auth';
    };

    return (
        <Box component="header" sx={{ '& .MuiStack-root > :not(style) ~ :not(style)': { marginLeft: '8px' } }}>
            <HeaderAccount
                rootLink={{ title: '', label: 'PagoPA S.p.A.', href: 'https://www.pagopa.it', ariaLabel: 'PagoPA S.p.A.' }}
                loggedUser={loggedUser}
                onLogout={handleLogout}
                onAssistanceClick={() => undefined}
                onDocumentationClick={() => undefined}
            />
            <HeaderProduct
                productId="mdc-pagopa"
                productsList={[{ id: 'mdc-pagopa', title: 'Messaggi di cortesia', productUrl: '', linkType: 'internal' }]}
                partyId={organization?.id ?? ''}
                partyList={partyList}
                onSelectedParty={() => undefined}
                onSelectedProduct={() => undefined}
                borderBottom={0}
            />
        </Box>
    );
};

export default Header;