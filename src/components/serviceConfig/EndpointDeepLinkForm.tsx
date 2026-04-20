import type { FormikProps } from 'formik';
import {
    Box, FormControlLabel, Grid,
    Radio, RadioGroup, TextField,
    Typography,
} from '@mui/material';
import {
    MailOutlined as Mail,
    PhoneAndroid as Phone,
} from '@mui/icons-material';
import * as Yup from 'yup';
import type { Step1Values } from '../../types/stepsOnboarding';
import { URL_REGEX } from '../../utils/constant';
import { DeepLinkSpecifico } from './deepLink/DeepLinkSpecifico';
import { DeepLinkUniversale } from './deepLink/DeepLinkUniversal';


export const endpointDeepLinkSchema = Yup.object({
    webhookUrl: Yup.string()
        .matches(URL_REGEX, 'Inserisci un URL valido')
        .required('Campo obbligatorio'),
    authUrl: Yup.string()
        .matches(URL_REGEX, 'Inserisci un URL valido')
        .required('Campo obbligatorio'),
    authType: Yup.string().required(),
    deepLinkType: Yup.string().required(),
    deepLinkUniversale: Yup.object().when('deepLinkType', {
        is: 'universale',
        then: (s) =>
            s.shape({
                fallBackLink: Yup.string()
                    .matches(URL_REGEX, 'URL non valido')
                    .required('Campo obbligatorio'),
                versions: Yup.array().of(
                    Yup.object({
                        versionKey: Yup.string().required('Campo obbligatorio'),
                        link: Yup.string().matches(URL_REGEX, 'URL non valido').required('Campo obbligatorio'),
                    })
                ),
            }),
    }),
    deepLinkDevices: Yup.array().when('deepLinkType', {
        is: 'specifico',
        then: (s) =>
            s.of(
                Yup.object({
                    fallBackLink: Yup.string()
                        .matches(URL_REGEX, 'URL non valido')
                        .required('Campo obbligatorio'),
                    versions: Yup.array().of(
                        Yup.object({
                            versionKey: Yup.string().required('Campo obbligatorio'),
                            link: Yup.string().matches(URL_REGEX, 'URL non valido').required('Campo obbligatorio'),
                        })
                    ),
                })
            ),
    }),
});


export default function EndpointDeepLinkForm({ formik }: { formik: FormikProps<Step1Values> }) {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue, setTouched, setErrors } = formik;

    // ── reset errori al cambio tipo ─────────────────────────────
    const handleDeepLinkTypeChange = (newType: string) => {
        void setFieldValue('deepLinkType', newType);
        // Resetta touched e errors dei campi dell'altro tipo
        void setTouched({ ...touched, deepLinkUniversale: undefined, deepLinkDevices: undefined });
        setErrors({ ...errors, deepLinkUniversale: undefined, deepLinkDevices: undefined });
    };

    // ── helpers universale ──────────────────────────────────────
    const addUniversaleVersion = () =>
        void setFieldValue('deepLinkUniversale.versions', [
            ...values.deepLinkUniversale.versions, { versionKey: '', link: '' }
        ]);

    const removeUniversaleVersion = (i: number) =>
        void setFieldValue('deepLinkUniversale.versions',
            values.deepLinkUniversale.versions.filter((_, idx) => idx !== i));

    const handleUniversaleVersionChange = (i: number, field: 'versionKey' | 'link', val: string) =>
        void setFieldValue(`deepLinkUniversale.versions[${i}].${field}`, val);

    // ── helpers specifico ───────────────────────────────────────
    const handleDeviceFallBackChange = (devIdx: number, val: string) =>
        void setFieldValue(`deepLinkDevices[${devIdx}].fallBackLink`, val);

    const handleDeviceVersionChange = (devIdx: number, vIdx: number, field: 'versionKey' | 'link', val: string) =>
        void setFieldValue(`deepLinkDevices[${devIdx}].versions[${vIdx}].${field}`, val);

    const addDeviceVersion = (devIdx: number) => {
        const updated = values.deepLinkDevices.map((d, i) =>
            i === devIdx ? { ...d, versions: [...d.versions, { versionKey: '', link: '' }] } : d
        );
        void setFieldValue('deepLinkDevices', updated);
    };

    const removeDeviceVersion = (devIdx: number, vIdx: number) => {
        const updated = values.deepLinkDevices.map((d, i) =>
            i === devIdx ? { ...d, versions: d.versions.filter((_, vi) => vi !== vIdx) } : d
        );
        void setFieldValue('deepLinkDevices', updated);
    };

    return (
        <Box>
            {/* ── Endpoint ── */}
            <Box className="cardsForm" mb={3}>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Mail />
                    <Typography variant="subtitle1" fontWeight={600}>Configurazione endpoint</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    PagoPA utilizzerà questi endpoint per inviarti i messaggi di cortesia destinati agli utenti.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth id="webhookUrl" name="webhookUrl" required
                            InputLabelProps={{ required: false }}
                            label="URL per ricezione messaggi di cortesia (webhook) *"
                            placeholder="https://api.tuoservizio.it/messages"
                            value={values.webhookUrl} onChange={handleChange} onBlur={handleBlur}
                            error={touched.webhookUrl && Boolean(errors.webhookUrl)}
                            helperText={touched.webhookUrl && errors.webhookUrl} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="authUrl" name="authUrl" required
                            InputLabelProps={{ required: false }}
                            label="URL di autenticazione *"
                            placeholder="https://api.tuoservizio.it/auth"
                            value={values.authUrl} onChange={handleChange} onBlur={handleBlur}
                            error={touched.authUrl && Boolean(errors.authUrl)}
                            helperText={touched.authUrl && errors.authUrl} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth select disabled id="authType" name="authType"
                            label="Tipo di autenticazione" value={values.authType}
                            onChange={handleChange} onBlur={handleBlur}>
                            <option value="OAuth2">OAuth2</option>
                        </TextField>
                    </Grid>
                </Grid>
            </Box>

            {/* ── Deep link ── */}
            <Box className="cardsForm">
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Phone />
                    <Typography variant="subtitle1" fontWeight={600}>Configurazione deep link app</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Deep link necessari per reindirizzare l&apos;utente sull&apos;app per il pagamento.
                </Typography>

                <RadioGroup row name="deepLinkType" value={values.deepLinkType}
                    onChange={(e) => handleDeepLinkTypeChange(e.target.value)}
                    sx={{ mb: 3, gap: 4 }}>
                    <FormControlLabel value="universale" control={<Radio />} label="Deep link universale" />
                    <FormControlLabel value="specifico" control={<Radio />} label="Deep link specifico per SO" />
                </RadioGroup>

                {values.deepLinkType === 'universale' && (
                    <DeepLinkUniversale
                        fallBackLink={values.deepLinkUniversale.fallBackLink}
                        versions={values.deepLinkUniversale.versions}
                        errors={errors.deepLinkUniversale as any}
                        touched={touched.deepLinkUniversale as any}
                        onFallBackChange={(val) => void setFieldValue('deepLinkUniversale.fallBackLink', val)}
                        onVersionChange={handleUniversaleVersionChange}
                        onAddVersion={addUniversaleVersion}
                        onRemoveVersion={removeUniversaleVersion}
                    />
                )}

                {values.deepLinkType === 'specifico' && (
                    <DeepLinkSpecifico
                        devices={values.deepLinkDevices}
                        errors={errors.deepLinkDevices as any}
                        onFallBackChange={handleDeviceFallBackChange}
                        onVersionChange={handleDeviceVersionChange}
                        onAddVersion={addDeviceVersion}
                        onRemoveVersion={removeDeviceVersion}
                    />
                )}
            </Box>
        </Box>
    );
}