import { Box, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { VersioneField } from './VersionField';
import type { DeviceLink, VersionEntry } from '../../../types/stepsOnboarding';

interface Props {
    devices: DeviceLink[];
    errors: any;
    onFallBackChange: (devIdx: number, val: string) => void;
    onVersionChange: (devIdx: number, vIdx: number, field: keyof VersionEntry, val: string) => void;
    onAddVersion: (devIdx: number) => void;
    onRemoveVersion: (devIdx: number, vIdx: number) => void;
}

export function DeepLinkSpecifico({
    devices, errors,
    onFallBackChange, onVersionChange, onAddVersion, onRemoveVersion,
}: Readonly<Props>) {
    return (
        <Box>
            {devices.map((device, devIdx) => (
                <Box key={device.so} mb={3}>
                    {devIdx > 0 && <Divider sx={{ mb: 3 }} />}

                    <Typography variant="caption" fontWeight={700}
                        sx={{ textTransform: 'uppercase', display: 'block', mb: 1 }}>
                        {device.so}
                    </Typography>

                    {/* fallBackLink fisso */}
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
                                onChange={(e) => onFallBackChange(devIdx, e.target.value)}
                                error={Boolean(errors?.[devIdx]?.fallBackLink)}
                                helperText={errors?.[devIdx]?.fallBackLink}
                            />
                        </Grid>
                    </Grid>

                    {/* versioni aggiuntive */}
                    {device.versions.map((v, vIdx) => (
                        <Grid container spacing={2} alignItems="center" key={vIdx} mb={1}>
                            <Grid item xs={12} sm={4}>
                                <VersioneField
                                    showTooltip={vIdx === 0} // ← tooltip solo sulla prima di ogni SO
                                    value={v.versionKey}
                                    onChange={(val) => onVersionChange(devIdx, vIdx, 'versionKey', val)}
                                    error={Boolean(errors?.[devIdx]?.versions?.[vIdx]?.versionKey)}
                                    helperText={errors?.[devIdx]?.versions?.[vIdx]?.versionKey}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    required
                                    InputLabelProps={{ required: false }}
                                    label="URL Redirect *"
                                    value={v.link}
                                    onChange={(e) => onVersionChange(devIdx, vIdx, 'link', e.target.value)}
                                    error={Boolean(errors?.[devIdx]?.versions?.[vIdx]?.link)}
                                    helperText={errors?.[devIdx]?.versions?.[vIdx]?.link}
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <IconButton onClick={() => onRemoveVersion(devIdx, vIdx)} aria-label="Rimuovi versione"
                                    style={errors?.[devIdx]?.versions?.[vIdx]?.link ? { marginBottom: 10} : {}}>
                                    <img
                                        src={"/icons/delete.svg"}
                                        alt=""
                                        aria-hidden="true"
                                        style={{ width: 20, height: 24 }}
                                    />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    <ButtonNaked color="primary" startIcon={<AddIcon />}
                        onClick={() => onAddVersion(devIdx)} size="small">
                        Aggiungi versione
                    </ButtonNaked>
                </Box>
            ))}
        </Box>
    );
}