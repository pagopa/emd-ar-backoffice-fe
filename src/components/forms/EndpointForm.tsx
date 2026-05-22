import {
    MailOutlined as Mail,
    PhoneAndroid as Phone
} from '@mui/icons-material';
import {
    Box, FormControlLabel, Grid,
    RadioGroup, TextField, Typography,
} from '@mui/material';
import type { FormikProps } from 'formik';

import { DeepLinkPerDevice } from '../deepLink/DeepLinkPerDevice';
import { DeepLinkUniversal } from '../deepLink/DeepLinkUniversal';
import type { Step1Values } from '../../types/stepsOnboarding';
import { CustomRadio } from './RadioButtons';




export default function EndpointForm({ formik }: Readonly<{ formik: FormikProps<Step1Values> }>) {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue, setTouched, setErrors } = formik;

    // Reset errors on type change
    const handleDeepLinkTypeChange = (newType: string) => {
        void setFieldValue('deepLinkType', newType);
        // Reset touched and errors for fields of the other type
        void setTouched({ ...touched, deepLinkUniversale: undefined, deepLinkDevices: undefined });
        setErrors({ ...errors, deepLinkUniversale: undefined, deepLinkDevices: undefined });
    };

    // Universal deep link helpers
    const addUniversaleVersion = () =>
        void setFieldValue('deepLinkUniversale.versions', [
            ...values.deepLinkUniversale.versions, { versionKey: '', link: '' }
        ]);

    const removeUniversaleVersion = (i: number) =>
        void setFieldValue('deepLinkUniversale.versions',
            values.deepLinkUniversale.versions.filter((_, idx) => idx !== i));

    const handleUniversaleVersionChange = (i: number, field: 'versionKey' | 'link', val: string) =>
        void setFieldValue(`deepLinkUniversale.versions[${i}].${field}`, val);

    // Per-device deep link helpers
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

    const handleDeviceFallBackBlur = (devIdx: number) =>
        void setTouched({
            ...touched,
            deepLinkDevices: values.deepLinkDevices.map((_, i) =>
                i === devIdx
                    ? { ...((touched as any).deepLinkDevices?.[i] ?? {}), fallBackLink: true }
                    : ((touched as any).deepLinkDevices?.[i] ?? {})
            ),
        });

    const handleDeviceVersionBlur = (devIdx: number, vIdx: number, field: 'versionKey' | 'link') => {
        const currentDevicesTouched = (touched as any).deepLinkDevices ?? [];
        const updatedDevices = values.deepLinkDevices.map((_, i) => {
            if (i !== devIdx) return currentDevicesTouched[i] ?? {};
            const currentVersions = currentDevicesTouched[devIdx]?.versions ?? [];
            const updatedVersions = currentVersions.map((v: any, vi: number) =>
                vi === vIdx ? { ...v, [field]: true } : v
            );
            // Estendi se necessario
            while (updatedVersions.length <= vIdx) updatedVersions.push({});
            updatedVersions[vIdx] = { ...updatedVersions[vIdx], [field]: true };
            return { ...currentDevicesTouched[i], versions: updatedVersions };
        });
        void setTouched({ ...touched, deepLinkDevices: updatedDevices });
    };

    return (
        <Box>
            {/* Endpoint configuration */}
            <Box className="cardsForm" mb={3} >
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Mail fontSize="small" style={{ color: "#BBC2D6" }} />
                    <Typography variant="subtitle1" fontWeight={600}>Configurazione endpoint</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    PagoPA utilizzerà questi endpoint per inviarti i messaggi di cortesia destinati agli utenti.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField fullWidth id="webhookUrl" name="webhookUrl" required
                            sx={{ borderRadius: '8px' }}
                            label="URL per ricezione messaggi di cortesia (webhook)"
                            placeholder="https://api.tuoservizio.it/messages"
                            value={values.webhookUrl} onChange={handleChange} onBlur={handleBlur}
                            error={touched.webhookUrl && Boolean(errors.webhookUrl)}
                            helperText={touched.webhookUrl && errors.webhookUrl}
                            inputProps={{ maxLength: 2048 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="authUrl" name="authUrl" required
                            style={{ borderRadius: '8px' }}
                            label="URL di autenticazione"
                            placeholder="https://api.tuoservizio.it/auth"
                            value={values.authUrl} onChange={handleChange} onBlur={handleBlur}
                            error={touched.authUrl && Boolean(errors.authUrl)}
                            helperText={touched.authUrl && errors.authUrl}
                            inputProps={{ maxLength: 2048 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth select disabled id="authType" name="authType"
                            label="Tipo di autenticazione" value={values.authType}
                            onChange={handleChange} onBlur={handleBlur}>
                            <option value="OAUTH2">OAuth2</option>
                        </TextField>
                    </Grid>
                </Grid>
            </Box>

            {/* Deep link configuration */}
            <Box className="cardsForm">
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Phone fontSize="small" style={{ color: "#BBC2D6" }} />
                    <Typography variant="subtitle1" fontWeight={600}>Configurazione deep link app</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" >
                    &quot;Deep link necessari&quot; per reindirizzare l&apos;utente sull&apos;app per il pagamento.
                </Typography>


                <RadioGroup
                    row
                    name="deepLinkType"
                    value={values.deepLinkType}
                    onChange={(e) => handleDeepLinkTypeChange(e.target.value)}
                    sx={{ gap: 18, paddingY: "24px", }}
                >
                    <FormControlLabel
                        value="universale"
                        control={<CustomRadio />}
                        label="Deep link universale"
                    />
                    <FormControlLabel
                        value="specifico"
                        control={<CustomRadio />}
                        label="Deep link specifico per SO"
                    />
                </RadioGroup>

                {/* Universal deep link */}
                {values.deepLinkType === 'universale' && (
                    <DeepLinkUniversal
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

                {/* Per-device deep link */}
                {values.deepLinkType === 'specifico' && (
                    <DeepLinkPerDevice
                        devices={values.deepLinkDevices}
                        errors={errors.deepLinkDevices as any}
                        touched={(touched as any).deepLinkDevices}
                        onFallBackChange={handleDeviceFallBackChange}
                        onFallBackBlur={handleDeviceFallBackBlur}
                        onVersionChange={handleDeviceVersionChange}
                        onVersionBlur={handleDeviceVersionBlur}
                        onAddVersion={addDeviceVersion}
                        onRemoveVersion={removeDeviceVersion}
                    />
                )}
            </Box>
        </Box>
    );
}