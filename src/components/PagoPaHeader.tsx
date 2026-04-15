import { HeaderAccount, HeaderProduct, type JwtUser } from '@pagopa/mui-italia';
import { Box } from '@mui/material';
import { useAppSelector } from '../redux/hook';

const Header = () => {

    const user = useAppSelector((state) => state.user.user);

    const loggedUser: JwtUser | false = user
        ? {
            id: user.uid,
            name: user.name,
            surname: '',
            email: user.sub,
        }
        : false;

    const partyList = user ? [
        {
            id: user.uid,
            name: user.name ?? "",
            productRole: user.role === 'admin' ? 'Amministratore' : 'Utente',
        },
    ] : [];


    return (
        <Box component="header" sx={{
            '& .MuiStack-root > :not(style) ~ :not(style)': {
                marginLeft: '8px',
            }
        }}>
            <HeaderAccount
                rootLink={{ title: '', label: 'PagoPA S.p.A.', href: 'https://www.pagopa.it', ariaLabel: 'PagoPA S.p.A.' }}
                loggedUser={loggedUser}
                onLogin={() => undefined}
                onLogout={() => undefined}
                onAssistanceClick={() => undefined}
                onDocumentationClick={() => undefined}
            />
            <HeaderProduct
                productId="mdc-pagopa"
                productsList={[
                    {
                        id: 'mdc-pagopa',
                        title: 'Messaggi di cortesia',
                        productUrl: '',
                        linkType: 'internal'
                    },
                ]}
                partyId={user?.uid ?? ''}
                partyList={partyList}
                onSelectedParty={() => undefined}
                onSelectedProduct={() => undefined}
                borderBottom={0}
            />
        </Box >
    )
};

export default Header;