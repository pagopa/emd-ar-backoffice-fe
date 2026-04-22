import { useState } from 'react';
import type { FormikProps } from 'formik';
import {
    Box, Grid, IconButton, InputAdornment,
    MenuItem, TextField, Typography, Button, Tooltip,
} from '@mui/material';
import {
    VpnKeyOutlined as CredentialIcon,
    VisibilityOutlined as EyeOn,
    VisibilityOffOutlined as EyeOff,
    Add as AddIcon,
    InfoOutlined as InfoIcon,
    CodeOutlined as UrlIcon,
} from '@mui/icons-material';
import type { Step2Values } from '../../types/stepsOnboarding';

interface Props {
    formik: FormikProps<Step2Values>;
}

export default function CredentialsForm({ formik }: Props) {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;
    const [isSecretVisible, setIsSecretVisible] = useState(false);

    // ── Body params helpers ──────────────────────────────────────────────────
    const addBodyParam = () =>
        void setFieldValue('bodyParams', [...values.bodyParams, { name: '', value: '' }]);

    const removeBodyParam = (index: number) =>
        void setFieldValue('bodyParams', values.bodyParams.filter((_, i) => i !== index));

    // ── URL params helpers ───────────────────────────────────────────────────
    const addUrlParam = () =>
        void setFieldValue('urlParams', [...values.urlParams, { name: '', value: '' }]);

    const removeUrlParam = (index: number) =>
        void setFieldValue('urlParams', values.urlParams.filter((_, i) => i !== index));

    // Typed error helpers to avoid casting everywhere
    const bodyErrors = (errors.bodyParams ?? []) as Array<{ name?: string; value?: string } | undefined>;
    const bodyTouched = (touched.bodyParams ?? []) as Array<{ name?: boolean; value?: boolean } | undefined>;
    const urlErrors = (errors.urlParams ?? []) as Array<{ name?: string; value?: string } | undefined>;
    const urlTouched = (touched.urlParams ?? []) as Array<{ name?: boolean; value?: boolean } | undefined>;

    return (
        <Box>
            {/* ── Credenziali di accesso ─────────────────────────────────── */}
            <Box className="cardsForm" mb={3}>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <CredentialIcon />
                    <Typography variant="subtitle1" fontWeight={600}>
                        Credenziali di accesso
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Credenziali necessarie per comunicare coi vostri sistemi in modo sicuro.
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="clientId"
                            name="clientId"
                            label="Client ID"
                            required
                            value={values.clientId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.clientId && Boolean(errors.clientId)}
                            helperText={touched.clientId && errors.clientId}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="clientSecret"
                            name="clientSecret"
                            label="Client Secret"
                            required
                            type={isSecretVisible ? 'text' : 'password'}
                            value={values.clientSecret}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.clientSecret && Boolean(errors.clientSecret)}
                            helperText={touched.clientSecret && errors.clientSecret}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={isSecretVisible ? 'Nascondi secret' : 'Mostra secret'}
                                            onClick={() => setIsSecretVisible((prev) => !prev)}
                                            edge="end"
                                        >
                                            {isSecretVisible ? <EyeOff /> : <EyeOn />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            id="grantType"
                            name="grantType"
                            label="Grant type"
                            value={values.grantType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                        >
                            <MenuItem value="client_credentials">client_credentials</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

                {/* ── Parametri aggiuntivi (BODY) ────────────────────────────── */}
                <Box >
                    {values.bodyParams.length > 0 && (
                        <Box mb={2} mt={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" gap={1} mb={2}>
                                <Typography variant="caption" fontWeight={700} letterSpacing={0.5} textTransform="uppercase">
                                    Parametri aggiuntivi (Body)
                                </Typography>
                                <Tooltip title="Parametri personalizzati richiesti dal tuo sistema per il rilascio del token (es. scope)">
                                    <InfoIcon sx={{ cursor: 'pointer', mr: 1, width: 24, height: 24, color: "primary.main" }} />
                                </Tooltip>
                            </Box>

                            <Grid container spacing={2}>
                                {values.bodyParams.map((param, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box display="flex" gap={2} alignItems="flex-start">
                                            <TextField
                                                size="small"
                                                label="Nome"
                                                name={`bodyParams[${index}].name`}
                                                value={param.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={bodyTouched[index]?.name && Boolean(bodyErrors[index]?.name)}
                                                helperText={bodyTouched[index]?.name && bodyErrors[index]?.name}
                                                sx={{ flex: 1 }}
                                            />
                                            <TextField
                                                size="small"
                                                label="Valore"
                                                name={`bodyParams[${index}].value`}
                                                value={param.value}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={bodyTouched[index]?.value && Boolean(bodyErrors[index]?.value)}
                                                helperText={bodyTouched[index]?.value && bodyErrors[index]?.value }
                                                sx={{ flex: 2 }}
                                            />
                                            <IconButton
                                                aria-label="Rimuovi parametro body"
                                                onClick={() => removeBodyParam(index)}
                                                sx={{ mt: 0.5 }}
                                            >
                                                <img src="/icons/delete.svg" alt="" aria-hidden="true" style={{ width: 24, height: 24 }} />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    <Button
                        startIcon={<AddIcon />}
                        onClick={addBodyParam}
                        size="small"
                        sx={{ textTransform: 'none', padding: 0 }}
                    >
                        Aggiungi parametro body
                    </Button>
                </Box>
            </Box>



            {/* ── Parametri aggiuntivi (URL) ─────────────────────────────── */}
            <Box>
                {values.urlParams.length > 0 && (
                    <Box className="cardsForm" mb={3}>
                        <Box mb={2}>
                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                <UrlIcon fontSize="small" />
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Parametri aggiuntivi (URL)
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Parametri extra da accodare all&apos;indirizzo web dell&apos;autenticazione (es. tenant_id).
                            </Typography>

                            <Grid container spacing={2}>
                                {values.urlParams.map((param, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box display="flex" gap={2} alignItems="flex-start">
                                            <TextField
                                                size="small"
                                                label="Nome"
                                                name={`urlParams[${index}].name`}
                                                value={param.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={urlTouched[index]?.name && Boolean(urlErrors[index]?.name)}
                                                helperText={urlTouched[index]?.name && urlErrors[index]?.name}
                                                sx={{ flex: 1 }}
                                            />
                                            <TextField
                                                size="small"
                                                label="Valore"
                                                name={`urlParams[${index}].value`}
                                                value={param.value}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={urlTouched[index]?.value && Boolean(urlErrors[index]?.value)}
                                                helperText={urlTouched[index]?.value && urlErrors[index]?.value}
                                                sx={{ flex: 2 }}
                                            />
                                            <IconButton
                                                onClick={() => removeUrlParam(index)}
                                                aria-label="Rimuovi versione"
                                                sx={{ mt: 0.5 }}
                                            >
                                                <img src="/icons/delete.svg" alt="" aria-hidden="true" style={{ width: 24, height: 24 }} />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addUrlParam}
                            size="small"
                            sx={{ padding: 0 }}
                        >
                            Aggiungi parametro URL
                        </Button>
                    </Box>
                )}

                {values.urlParams.length === 0 && (<Button
                    startIcon={<AddIcon />}
                    onClick={addUrlParam}
                    size="small"
                    sx={{ padding: 0 }}
                >
                    Aggiungi parametro URL
                </Button>)
                }
            </Box>
        </Box>
    );
}