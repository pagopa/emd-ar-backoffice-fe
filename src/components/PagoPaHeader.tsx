import { HeaderAccount, HeaderProduct, type JwtUser } from '@pagopa/mui-italia';
import { Box } from '@mui/material';
import { getUserFromStorage } from '../utils/user';
import { useEffect } from 'react';

const Header = () => {

    const user = getUserFromStorage();

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

    useEffect(() => {
        console.log(user)
    }, [])

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
                productId="pagamenti-pagopa"
                productsList={[
                    {
                        id: 'pagamenti-pagopa',
                        title: 'Pagamenti pagoPA',
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