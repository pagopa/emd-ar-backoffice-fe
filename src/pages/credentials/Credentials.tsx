/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getTppCredentials } from '../../api/tpp';
import ROUTES from '../../routes';
import { CredentialsSection } from './components/CredentialsSection';
import { ReadonlyField } from './components/ReadOnlyField';

import type { CredentialsPageDTO } from '../../types/tpp';
import { useState, useEffect } from 'react';
import CredentialsSkeleton from './components/CredentialsSkeleton';
import AdditionalParamsSection from './components/AdditionalParamsSection';

const Credentials = () => {
    const [tppData, setTppData] = useState<CredentialsPageDTO>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        void getTppCredentials().then((data) => {
            setTppData(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <CredentialsSkeleton />;
    }

    const onModify = () => {
        void navigate(ROUTES.CREDENTIALS_MODIFY, { replace: true })
    }

    return (
        <Box display="flex" sx={{ padding: 3, gap: 3 }} flexDirection="column">

            {/* Header */}
            <Box display="flex" flexDirection="column" gap="16px">
                <Typography variant="h4">Credenziali</Typography>
                <Typography variant="subtitle2">
                    Qui puoi visualizzare le chiavi di accesso per collegarti a PagoPA e
                    gestire le credenziali necessarie per ricevere i messaggi di cortesia sui tuoi sistemi.
                </Typography>
            </Box>

            {/* Credentials PagoPA */}
            {tppData?.pagoPaCredentials && (
                <CredentialsSection
                    title="Credenziali PagoPA"
                    clientId={tppData.pagoPaCredentials.clientId}
                    clientSecret={tppData.pagoPaCredentials.clientSecret}
                    grantType={tppData.pagoPaCredentials.grantType}
                />
            )}

            {/* TPP ID */}
            {tppData?.tppId && (
                <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6" fontWeight={600}>TPP ID</Typography>
                    <ReadonlyField label="" value={tppData.tppId} />
                </Paper>
            )}

            {/* Credentials TPP */}
            {tppData?.tppCredentials && (
                <CredentialsSection
                    title="Credenziali TPP"
                    clientId={tppData.tppCredentials.clientId}
                    clientSecret={tppData.tppCredentials.clientSecret}
                    grantType={tppData.tppCredentials.grantType}
                    showEditButton
                    onModify={() => onModify()}
                />
            )}

            {/* Additional parameters */}
            <AdditionalParamsSection
                bodyParams={tppData?.additionalParams?.bodyParams}
                pathParams={tppData?.additionalParams?.pathParams}
                onModify={onModify}
            />

        </Box>
    );
};

export default Credentials;