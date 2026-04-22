import { Box, Grid, IconButton, TextField } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { VersioneField } from './VersionField';
import type { VersionEntry } from '../../../types/stepsOnboarding';

interface Props {
    fallBackLink: string;
    versions: VersionEntry[];
    errors: any;
    touched: any;
    onFallBackChange: (val: string) => void;
    onVersionChange: (index: number, field: keyof VersionEntry, val: string) => void;
    onAddVersion: () => void;
    onRemoveVersion: (index: number) => void;
}

export function DeepLinkUniversal({
    fallBackLink, versions, errors, touched,
    onFallBackChange, onVersionChange, onAddVersion, onRemoveVersion,
}: Readonly<Props>) {
    return (
        <Box>
            <TextField
                fullWidth
                required
                InputLabelProps={{ required: false }}
                label="URL Redirect *"
                placeholder="https://tuoservizio.it/pagamento"
                value={fallBackLink}
                onChange={(e) => onFallBackChange(e.target.value)}
                error={Boolean(touched?.fallBackLink && errors?.fallBackLink)}
                helperText={touched?.fallBackLink && errors?.fallBackLink || ' '}
                sx={{ mb: 2 }}
            />

            {versions.map((version, index) => (
                <Grid container spacing={2} alignItems="flex-start" key={index} mb={1}>
                    <Grid item xs={12} sm={4}>
                        <VersioneField
                            showTooltip={index === 0}
                            value={version.versionKey}
                            onChange={(val) => onVersionChange(index, 'versionKey', val)}
                            error={Boolean(errors?.versions?.[index]?.versionKey)}
                            helperText={errors?.versions?.[index]?.versionKey || ' '}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            required
                            InputLabelProps={{ required: false }}
                            label="URL Redirect *"
                            value={version.link}
                            onChange={(e) => onVersionChange(index, 'link', e.target.value)}
                            error={Boolean(errors?.versions?.[index]?.link)}
                            helperText={errors?.versions?.[index]?.link || ' '}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton
                            onClick={() => onRemoveVersion(index)}
                            aria-label="Rimuovi versione"
                            sx={{ mt: '8px' }}
                        >
                            <img src="/icons/delete.svg" alt="" aria-hidden="true" style={{ width: 24, height: 24 }} />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}

            <ButtonNaked color="primary" startIcon={<AddIcon />} onClick={onAddVersion} size="small">
                Aggiungi versione
            </ButtonNaked>
        </Box>
    );
}