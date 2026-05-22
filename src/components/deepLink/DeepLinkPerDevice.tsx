import { Add as AddIcon } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';

import { VersioneField } from './VersionField';

import { ButtonNaked } from '@pagopa/mui-italia';
import type { DeviceLink, VersionEntry } from '../../types/stepsOnboarding';

import { useTranslation } from 'react-i18next';
interface Props {
    devices: DeviceLink[];
    errors: any;
    touched: any;
    onFallBackChange: (deviceIndex: number, val: string) => void;
    onFallBackBlur: (deviceIndex: number) => void;
    onVersionChange: (deviceIndex: number, versionIndex: number, field: keyof VersionEntry, val: string) => void;
    onVersionBlur: (deviceIndex: number, versionIndex: number, field: keyof VersionEntry) => void;
    onAddVersion: (deviceIndex: number) => void;
    onRemoveVersion: (deviceIndex: number, versionIndex: number) => void;
}

export function DeepLinkPerDevice({
    devices, errors, touched,
    onFallBackChange, onVersionChange, onAddVersion, onRemoveVersion, onFallBackBlur, onVersionBlur
}: Readonly<Props>) {
    const { t } = useTranslation();
    const dl = 'onboarding.step1.deepLink';

    return (
        <Box>
            {devices.map((device, deviceIndex) => (
                <Box key={device.so} mt={deviceIndex === 0 ? 0 : 3} mb={2}>
                    <Typography variant="labelDevice" mb={2}>{device.so}</Typography>

                    <Grid container spacing={2} alignItems="flex-start" mb={2}>
                        <Grid item sx={{ width: 160, flexShrink: 0 }}>
                            <TextField fullWidth disabled label={t(`${dl}.versionLabel`)} value="fallBackLink" />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                required={device.so !== 'WEB'}
                                label={t(`${dl}.urlRedirect`)}
                                value={device.fallBackLink}
                                onChange={(e) => onFallBackChange(deviceIndex, e.target.value)}
                                onBlur={() => onFallBackBlur(deviceIndex)}
                                error={Boolean(touched?.[deviceIndex]?.fallBackLink && errors?.[deviceIndex]?.fallBackLink)}
                                helperText={touched?.[deviceIndex]?.fallBackLink && errors?.[deviceIndex]?.fallBackLink}
                            />
                        </Grid>
                    </Grid>

                    {device.versions.map((version, versionIndex) => (
                        <Grid container spacing={2} alignItems="flex-start" key={versionIndex} mb={2}>
                            <Grid item sx={{ width: 160, flexShrink: 0 }}>
                                <VersioneField
                                    showTooltip={versionIndex === 0}
                                    value={version.versionKey}
                                    onChange={(val) => onVersionChange(deviceIndex, versionIndex, 'versionKey', val)}
                                    error={Boolean(errors?.[deviceIndex]?.versions?.[versionIndex]?.versionKey)}
                                    helperText={errors?.[deviceIndex]?.versions?.[versionIndex]?.versionKey || ''}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    required
                                    label={t(`${dl}.urlRedirect`)}
                                    value={version.link}
                                    onChange={(e) => onVersionChange(deviceIndex, versionIndex, 'link', e.target.value)}
                                    onBlur={() => onVersionBlur(deviceIndex, versionIndex, 'link')}
                                    error={Boolean(
                                        touched?.[deviceIndex]?.versions?.[versionIndex]?.link &&
                                        errors?.[deviceIndex]?.versions?.[versionIndex]?.link
                                    )}
                                    helperText={
                                        touched?.[deviceIndex]?.versions?.[versionIndex]?.link &&
                                        errors?.[deviceIndex]?.versions?.[versionIndex]?.link || ''
                                    }
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <IconButton
                                    onClick={() => onRemoveVersion(deviceIndex, versionIndex)}
                                    aria-label={t(`${dl}.removeVersion`)}
                                    sx={{ alignContent: 'center' }}
                                >
                                    <img src="/icons/delete.svg" alt="" aria-hidden="true" style={{ width: 20, height: 24 }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    <ButtonNaked color="primary" startIcon={<AddIcon />}
                        onClick={() => onAddVersion(deviceIndex)} size="small">
                        {t(`${dl}.addVersion`)}
                    </ButtonNaked>
                </Box>
            ))}
        </Box>
    );
}