/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import {
    CodeOutlined as UrlIcon,
    EditOutlined as ModifyIcon
} from '@mui/icons-material';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getTpp } from '../../api/tpp';
import Layout from '../../components/layoutPages/Layout';
import ROUTES from '../../routes';
import { CredentialsSection } from './components/CredentialsSection';
import { ReadonlyField } from './components/ReadOnlyField';

import { ButtonNaked } from '@pagopa/mui-italia';
import type { CredentialsPageDTO } from '../../types/tpp';
import { useState, useEffect } from 'react';
import CredentialsSkeleton from './components/CredentialsSkeleton';

const Credentials = () => {
    const [tppData, setTppData] = useState<CredentialsPageDTO>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        void getTpp().then((data) => {
            setTppData(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <Layout isSidebarEnabled={true}>
                <CredentialsSkeleton />
            </Layout>
        );
    }

    const onModify = () => {
        void navigate(ROUTES.CREDENTIALS_MODIFY, { replace: true })
    }

    return (
        <Layout isSidebarEnabled={true}>
            <Box display="flex" sx={{ padding: 3, gap: 3 }} flexDirection="column">

                {/* Header */}
                <Box display="flex" flexDirection="column" gap="16px">
                    <Typography variant="h4">Credenziali</Typography>
                    <Typography variant="subtitle2">
                        Qui puoi visualizzare le chiavi di accesso per collegarti a PagoPA e
                        gestire le credenziali necessarie per ricevere i messaggi di cortesia sui tuoi sistemi.
                    </Typography>
                </Box>

                {/* Credenziali PagoPA */}
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

                {/* Credenziali TPP */}
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

                {/* Parametri aggiuntivi */}
                {tppData?.additionalParams && (
                    <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent={"space-between"}
                            gap={0.5}
                            sx={{ cursor: 'pointer', color: 'primary.main' }}
                        >
                            <Typography variant="h6">Parametri aggiuntivi </Typography>
                            <ButtonNaked onClick={() => { onModify() }} color="primary" style={{ display: "flex", gap: 8 }}>
                                <ModifyIcon fontSize="small" />
                                <Typography variant="label">Modifica</Typography>
                            </ButtonNaked>
                        </Box>

                        <Box display="flex" gap={3}>
                            {/* PARAMETRI BODY */}
                            <Box flex={1} display="flex" flexDirection="column" gap={1}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <img src="/icons/integration_instructions.svg" alt="" aria-hidden="true" style={{ width: 24, height: 24 }} />
                                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                                        PARAMETRI BODY
                                    </Typography>
                                </Box>
                                {/* VALORI PARAMETRI BODY */}
                                {Object.entries(tppData.additionalParams.bodyParams).map(([key, val], index) => (
                                    <Box key={key}>
                                        {index !== 0 && <Divider orientation="horizontal" />}
                                        <Typography variant="caption" color="text.secondary">{key}</Typography>
                                        <Typography variant="body2" fontWeight={500}>{val}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* PARAMETRI URL */}
                            <Box flex={1} display="flex" flexDirection="column" gap={1}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <UrlIcon style={{ color: "#BBC2D6" }} />
                                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                                        PARAMETRI URL
                                    </Typography>
                                </Box>
                                {/* VALORI PARAMETRI URL */}
                                {Object.entries(tppData.additionalParams.pathParams ?? {}).map(([key, val]) => (
                                    <Box key={key}>
                                        <Typography variant="caption" color="text.secondary">{key}</Typography>
                                        <Typography variant="body2" fontWeight={500}>{val}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Paper>
                )}

            </Box>
        </Layout>
    );
};

export default Credentials;