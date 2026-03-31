import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { acsHandshake, } from '../../api/auth';
import ROUTES from '../../routes';
import { Box, CircularProgress, Typography, Link } from '@mui/material';
import { saveUserFromToken } from '../../utils/user';
import { CONFIG } from '../../config';

type AcsState = 'loading' | 'error';

const Auth = () => {
    const { hash = '' } = window.location;
    const urlToken =   hash.startsWith('#token=') ? hash.slice('#token='.length).trim() : '';

    const [state, setState] = useState<AcsState>(urlToken ? 'loading' : 'error');
    const navigate = useNavigate();

    useEffect(() => {
        if (!urlToken) return;
        history.replaceState(null, '', window.location.pathname);

        acsHandshake(urlToken)
            .then((response) => {
                if (response.token) {
                    const user = saveUserFromToken(response.token);
                    if (!user) throw new Error('Could not decode user from inner token');
                }
                void navigate(ROUTES.HOME, { replace: true });
            })
            .catch((err) => {
                console.error('[ACS] handshake failed:', err);
                setState('error');
            });
    }, [urlToken, navigate]);

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
                        href={CONFIG.AR_BASE_URL}
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