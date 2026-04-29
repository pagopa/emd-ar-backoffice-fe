import { useEffect, useState } from 'react';

import { Box, CircularProgress, Link,Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { acsHandshake, } from '../../api/auth';
import { CONFIG } from '../../config';
import { useAppDispatch } from '../../redux/hook';
import { setOrganization } from '../../redux/slices/organizationSlice';
import ROUTES from '../../routes';
import { saveOrganization } from '../../utils/organization';
import { saveUser } from '../../utils/user';

import { userActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';

type AcsState = 'loading' | 'error';

const Auth = () => {

    const { hash } = useLocation();
    const urlToken = hash.startsWith('#token=') ? hash.slice('#token='.length).trim() : '';

    const [state, setState] = useState<AcsState>(urlToken ? 'loading' : 'error');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!urlToken) return;
        history.replaceState(null, '', window.location.pathname);

        if (CONFIG.ENV === "DEV") console.log("[ACS] urlToken : ", urlToken)

        acsHandshake(urlToken)
            .then((response) => {
                if (!response.token || !response.userInfo?.organization) {
                    throw new Error('Risposta BFF incompleta');
                }
                storageTokenOps.write(response.token);
                const organization = saveOrganization(response.userInfo.organization);
                const user = saveUser(response.userInfo)
                dispatch(userActions.setLoggedUser(user));
                dispatch(setOrganization(organization));
                void navigate(ROUTES.ONBOARDING, { replace: true });
            })
            .catch((err) => {
                console.error('[ACS] handshake failed:', err);
                setState('error');
            });
    }, [urlToken, navigate, dispatch]);

    if (state === 'error') {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                gap={2}
            >
                <Typography variant="h6" color="error">
                    Accesso non riuscito
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Il link potrebbe essere scaduto.&nbsp;
                    <Link
                        href={CONFIG.AR_BASE_URL + "/auth"}
                        underline="always"
                        color="primary"
                    >
                        Torna all&apos;Area Riservata
                    </Link>
                    .
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            gap={3}
        >
            <CircularProgress size={48} />
            <Typography variant="h6" component="h1">
                Autenticazione in corso...
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Attendere, verifica delle credenziali in corso.
            </Typography>
        </Box>
    );

};

export default Auth;