import { useEffect, useState } from 'react';

import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { acsHandshake } from '../../api/auth';
import { checkTppExists } from '../../api/tpp';
import { CONFIG } from '../../config';
import { useAppDispatch } from '../../redux/hook';
import { setOrganization, setTppRegistered } from '../../redux/slices/organizationSlice';
import ROUTES from '../../routes';
import { saveOrganization } from '../../utils/organization';
import { saveUser } from '../../utils/user';

import { userActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useTranslation } from 'react-i18next';

type AcsState = 'loading' | 'error' | 'check-failed';

const Auth = () => {
    const { t } = useTranslation();

    const { hash } = useLocation();
    const urlToken = hash.startsWith('#token=') ? hash.slice('#token='.length).trim() : '';

    const [state, setState] = useState<AcsState>(urlToken ? 'loading' : 'error');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!urlToken) return;
        history.replaceState(null, '', window.location.pathname);

        if (CONFIG.ENV === 'DEV') console.log('[ACS] urlToken : ', urlToken);

        acsHandshake(urlToken)
            .then(async (response) => {
                if (!response.token || !response.userInfo?.organization) {
                    throw new Error('Risposta BFF incompleta');
                }

                storageTokenOps.write(response.token);
                const organization = saveOrganization(response.userInfo.organization);
                const user = saveUser(response.userInfo);
                dispatch(userActions.setLoggedUser(user));
                dispatch(setOrganization(organization));

                try {
                    const tppResponse = await checkTppExists();
                    if (tppResponse === null) {
                        dispatch(setTppRegistered(false));
                        void navigate(ROUTES.ONBOARDING, { replace: true });
                    } else {
                        dispatch(setTppRegistered(true));
                        void navigate(ROUTES.HOME, { replace: true });
                    }
                } catch {
                    setState('check-failed');
                }
            })
            .catch((err) => {
                console.error('[ACS] handshake failed:', err);
                setState('error');
            });
    }, [urlToken, navigate, dispatch]);

    if (state === 'error' || state === 'check-failed') {

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
                    {state === 'error' ? t('auth.error.title') : t('auth.checkFailed.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {state === 'error' ? t('auth.error.description') : t('auth.checkFailed.description')}&nbsp;                    <Link
                        href={CONFIG.AR_BASE_URL + '/auth'}
                        underline="always"
                        color="primary"
                    >
                        {t('commonLabel.backToArea')}
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
                {t('auth.loading')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {t('auth.loadingDescription')}
            </Typography>
        </Box>
    );

};

export default Auth;