import { Box, Grid, IconButton, TextField } from '@mui/material';
import { Add as AddIcon} from '@mui/icons-material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { VersioneField } from './VersionField';
import type { VersionEntry } from '../../../types/stepsOnboarding';

interface Props {
    fallBackLink: string;
    versions: VersionEntry[];
    errors: any;
    touched: any;
    onFallBackChange: (val: string) => void;
    onVersionChange: (i: number, field: keyof VersionEntry, val: string) => void;
    onAddVersion: () => void;
    onRemoveVersion: (i: number) => void;
}

export function DeepLinkUniversale({
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
                helperText={touched?.fallBackLink && errors?.fallBackLink}
                sx={{ mb: 2 }}
            />

            {versions.map((v, i) => (
                <Grid container spacing={2} alignItems="center" key={i} mb={1}>
                    <Grid item xs={12} sm={4}>
                        <VersioneField
                            showTooltip={i === 0}
                            value={v.versionKey}
                            onChange={(val) => onVersionChange(i, 'versionKey', val)}
                            error={Boolean(errors?.versions?.[i]?.versionKey)}
                            helperText={errors?.versions?.[i]?.versionKey}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            required
                            InputLabelProps={{ required: false }}
                            label="URL Redirect *"
                            value={v.link}
                            onChange={(e) => onVersionChange(i, 'link', e.target.value)}
                            error={Boolean(errors?.versions?.[i]?.link)}
                            helperText={errors?.versions?.[i]?.link}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={() => onRemoveVersion(i)} aria-label="Rimuovi versione"
                            style={errors?.versions?.[i]?.link ? { marginBottom: 12 } : {}}>
                            <img
                                src={"/icons/delete.svg"}
                                alt=""
                                aria-hidden="true"
                                style={{ width: 24, height: 24 }}
                            />
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