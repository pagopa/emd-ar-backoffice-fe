import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getPagoPACredentials, getTppCredentials, getTppProfile } from '../../api/tpp';
import ROUTES from '../../routes';
import { CredentialsSection } from './components/CredentialsSection';
import { ReadonlyField } from './components/ReadOnlyField';

import CredentialsSkeleton from './components/CredentialsSkeleton';
import AdditionalParamsSection from './components/AdditionalParamsSection';
import ErrorContent from '../../components/ErrorContent';
import { useSafeFetch } from '../../hook/useSafeFetch';

const KNOWN_TOKEN_KEYS = new Set(['client_id', 'client_secret', 'grant_type']);

const extractTppFields = (body: Record<string, string> = {}) => ({
    tppClientId: body.client_id ?? '',
    tppClientSecret: body.client_secret ?? '',
    tppGrantType: body.grant_type ?? '',
    extraBodyParams: Object.fromEntries(
        Object.entries(body).filter(([k]) => !KNOWN_TOKEN_KEYS.has(k))
    ) as Record<string, string>,
});

const Credentials = () => {

    const navigate = useNavigate();

    const { data, loading, fetchError } = useSafeFetch(() =>
        Promise.all([getPagoPACredentials(), getTppCredentials(), getTppProfile()])
    );

    if (loading) return <CredentialsSkeleton />;
    if (fetchError) return <ErrorContent />;

    const onModify = () => {
        void navigate(ROUTES.CREDENTIALS_MODIFY, { replace: true })
    }

    const [pagoPaCredentials, tppCredentials, tppInfo] = data ?? [undefined, undefined, null];
    const tppId = tppInfo?.tppId ?? '';

    const { tppClientId, tppClientSecret, tppGrantType, extraBodyParams } =
        extractTppFields(tppCredentials?.bodyAdditionalProperties);

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
            {pagoPaCredentials && (
                <CredentialsSection
                    title="Credenziali PagoPA"
                    clientId={pagoPaCredentials.clientId}
                    clientSecret={pagoPaCredentials.clientSecret}
                    grantType={pagoPaCredentials.grantType}
                />
            )}

            {/* TPP ID */}
            {tppId && (
                <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">TPP ID</Typography>
                    <ReadonlyField label="" value={tppId} />
                </Paper>
            )}

            {/* Credentials TPP */}
            {tppCredentials && (
                <CredentialsSection
                    title="Credenziali TPP"
                    clientId={tppClientId}
                    clientSecret={tppClientSecret}
                    grantType={tppGrantType}
                    showEditButton
                    onModify={() => onModify()}
                />
            )}

            {/* Additional parameters */}
            <AdditionalParamsSection
                bodyParams={extraBodyParams}
                pathParams={tppCredentials?.pathAdditionalProperties}
                onModify={onModify}
            />

        </Box>
    );
};

export default Credentials;