import { Box, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { VersioneField } from './VersionField';
import type { DeviceLink, VersionEntry } from '../../../types/stepsOnboarding';

interface Props {
    devices: DeviceLink[];
    errors: any;
    onFallBackChange: (deviceIndex: number, val: string) => void;
    onVersionChange: (deviceIndex: number, versionIndex: number, field: keyof VersionEntry, val: string) => void;
    onAddVersion: (deviceIndex: number) => void;
    onRemoveVersion: (deviceIndex: number, versionIndex: number) => void;
}

export function DeepLinkPerDevice({
    devices, errors,
    onFallBackChange, onVersionChange, onAddVersion, onRemoveVersion,
}: Readonly<Props>) {
    return (
        <Box>
            {devices.map((device, deviceIndex) => (
                <Box key={device.so} mb={3}>
                    {deviceIndex > 0 && <Divider sx={{ mb: 3 }} />}

                    <Typography variant="caption" fontWeight={700}
                        sx={{ textTransform: 'uppercase', display: 'block', mb: 1 }}>
                        {device.so}
                    </Typography>

                    {/* Fallback URL — fixed row, always present */}
                    <Grid container spacing={2} alignItems="center" mb={1}>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth disabled label="Versione" value="fallBackLink" />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                required
                                InputLabelProps={{ required: false }}
                                label="URL Redirect *"
                                value={device.fallBackLink}
                                onChange={(e) => onFallBackChange(deviceIndex, e.target.value)}
                                error={Boolean(errors?.[deviceIndex]?.fallBackLink)}
                                helperText={errors?.[deviceIndex]?.fallBackLink}
                            />
                        </Grid>
                    </Grid>

                    {/* Additional version rows */}
                    {device.versions.map((version, versionIndex) => (
                        <Grid container spacing={2} alignItems="center" key={versionIndex} mb={1}>
                            <Grid item xs={12} sm={4}>
                                <VersioneField
                                    showTooltip={versionIndex === 0} // tooltip only on first row per device
                                    value={version.versionKey}
                                    onChange={(val) => onVersionChange(deviceIndex, versionIndex, 'versionKey', val)}
                                    error={Boolean(errors?.[deviceIndex]?.versions?.[versionIndex]?.versionKey)}
                                    helperText={errors?.[deviceIndex]?.versions?.[versionIndex]?.versionKey}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    required
                                    InputLabelProps={{ required: false }}
                                    label="URL Redirect *"
                                    value={version.link}
                                    onChange={(e) => onVersionChange(deviceIndex, versionIndex, 'link', e.target.value)}
                                    error={Boolean(errors?.[deviceIndex]?.versions?.[versionIndex]?.link)}
                                    helperText={errors?.[deviceIndex]?.versions?.[versionIndex]?.link}
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <IconButton
                                    onClick={() => onRemoveVersion(deviceIndex, versionIndex)}
                                    aria-label="Rimuovi versione"
                                    style={errors?.[deviceIndex]?.versions?.[versionIndex]?.link ? { marginBottom: 10 } : {}}
                                >
                                    <img src="/icons/delete.svg" alt="" aria-hidden="true" style={{ width: 20, height: 24 }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    <ButtonNaked color="primary" startIcon={<AddIcon />}
                        onClick={() => onAddVersion(deviceIndex)} size="small">
                        Aggiungi versione
                    </ButtonNaked>
                </Box>
            ))}
        </Box>
    );
}