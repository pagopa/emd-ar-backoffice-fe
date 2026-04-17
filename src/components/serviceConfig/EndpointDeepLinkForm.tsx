import type { FormikProps } from 'formik';
import {
    Box, Checkbox, Divider, FormControlLabel, Grid,
    IconButton, MenuItem, Radio, RadioGroup,
    TextField, Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ButtonNaked } from '@pagopa/mui-italia';
import * as Yup from 'yup';
import type { Step1Values } from '../../types/stepsOnboarding';

const URL_REGEX = /^https?:\/\/.+/;

export const endpointDeepLinkSchema = Yup.object({
    webhookUrl: Yup.string()
        .matches(URL_REGEX, 'Inserisci un URL valido (es. https://...)')
        .required('Campo obbligatorio'),
    authUrl: Yup.string()
        .matches(URL_REGEX, 'Inserisci un URL valido')
        .required('Campo obbligatorio'),
    authType: Yup.string().required(),
    deepLinkEnabled: Yup.boolean(),
    deepLinkType: Yup.string().when('deepLinkEnabled', {
        is: true,
        then: (s) => s.required(),
    }),
    deepLinkVersions: Yup.array().when('deepLinkEnabled', {
        is: true,
        then: (s) =>
            s.of(
                Yup.object({
                    so: Yup.string().required(),
                    urlRedirect: Yup.string()
                        .matches(URL_REGEX, 'URL non valido')
                        .required('Campo obbligatorio'),
                    version: Yup.string(),
                })
            ),
    }),
});

interface Props {
    formik: FormikProps<Step1Values>;
}

export default function EndpointDeepLinkForm({ formik }: Props) {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;

    const addVersion = () => {
        void setFieldValue('deepLinkVersions', [
            ...values.deepLinkVersions,
            { so: 'ANDROID', urlRedirect: '', version: '' },
        ]);
    };

    const removeVersion = (index: number) => {
        void setFieldValue(
            'deepLinkVersions',
            values.deepLinkVersions.filter((_, i) => i !== index)
        );
    };

    return (
        <Box>
            {/* ── Configurazione endpoint ── */}
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                {/* icona decorativa dal figma — stessa tecnica del SideMenu */}
                <img src="/icons/endpoint.svg" alt="" aria-hidden width={20} height={20} />
                <Typography variant="subtitle1" fontWeight={600}>
                    Configurazione endpoint
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
                PagoPA utilizzerà questi endpoint per inviarti i messaggi di cortesia destinati agli utenti.
            </Typography>

            <Grid container spacing={2} mb={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="webhookUrl"
                        name="webhookUrl"
                        label="URL per ricezione messaggi di cortesia (webhook)"
                        required
                        placeholder="https://api.tuoservizio.it/messages"
                        value={values.webhookUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.webhookUrl && Boolean(errors.webhookUrl)}
                        helperText={touched.webhookUrl && errors.webhookUrl}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="authUrl"
                        name="authUrl"
                        label="URL di autenticazione"
                        required
                        placeholder="https://api.tuoservizio.it/auth"
                        value={values.authUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.authUrl && Boolean(errors.authUrl)}
                        helperText={touched.authUrl && errors.authUrl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        id="authType"
                        name="authType"
                        label="Tipo di autenticazione"
                        value={values.authType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={true}
                    >
                        <MenuItem value="OAuth2">OAuth2</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            {/* ── Configurazione deep link app ── */}
            <FormControlLabel
                control={
                    <Checkbox
                        id="deepLinkEnabled"
                        name="deepLinkEnabled"
                        checked={values.deepLinkEnabled}
                        onChange={(e) => void setFieldValue('deepLinkEnabled', e.target.checked)}
                    />
                }
                label={
                    <Typography variant="subtitle1" fontWeight={600}>
                        Configurazione deep link app
                    </Typography>
                }
            />
            <Typography variant="body2" color="text.secondary" mb={2}>
                Deep link necessari per reindirizzare l&apos;utente nell&apos;app per il pagamento.
            </Typography>

            {values.deepLinkEnabled && (
                <Box>
                    <RadioGroup
                        row
                        name="deepLinkType"
                        value={values.deepLinkType}
                        onChange={(e) => void setFieldValue('deepLinkType', e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        <FormControlLabel
                            value="universale"
                            control={<Radio />}
                            label="Deep link universale"
                        />
                        <FormControlLabel
                            value="specifico"
                            control={<Radio />}
                            label="Deep link specifico per SO"
                        />
                    </RadioGroup>

                    {values.deepLinkVersions.map((entry, i) => (
                        <Box key={i} mb={2}>
                            {values.deepLinkType === 'specifico' && (
                                <Typography variant="caption" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
                                    {entry.so}
                                </Typography>
                            )}
                            <Grid container spacing={2} alignItems="center">
                                {values.deepLinkType === 'specifico' && (
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            label="Versione"
                                            placeholder="fallBackLink"
                                            value={entry.version ?? ''}
                                            onChange={(e) =>
                                                void setFieldValue(
                                                    `deepLinkVersions[${i}].version`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                )}
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        label="URL Redirect"
                                        required
                                        value={entry.urlRedirect}
                                        onChange={(e) =>
                                            void setFieldValue(
                                                `deepLinkVersions[${i}].urlRedirect`,
                                                e.target.value
                                            )
                                        }
                                        error={
                                            !!(errors.deepLinkVersions?.[i] as any)?.urlRedirect
                                        }
                                        helperText={
                                            (errors.deepLinkVersions?.[i] as any)?.urlRedirect
                                        }
                                    />
                                </Grid>
                                {values.deepLinkVersions.length > 1 && (
                                    <Grid item xs="auto">
                                        <IconButton
                                            aria-label="Rimuovi versione"
                                            onClick={() => removeVersion(i)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    ))}

                    <ButtonNaked
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={addVersion}
                        size="small"
                    >
                        Aggiungi versione
                    </ButtonNaked>
                </Box>
            )}
        </Box>
    );
}