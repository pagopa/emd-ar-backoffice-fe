import {  InputAdornment, TextField, Tooltip } from "@mui/material";
import { InfoOutlined as InfoIcon } from '@mui/icons-material';

const TOOLTIP_VERSIONE =
    'Ti consigliamo di nominare le versioni con il prefisso "v" e un numero crescente (v1, v2). ' +
    'Non è possibile utilizzare punti (esempio: v1.2), quindi consigliamo di utilizzare altre modalità (esempio: v1_2).';

export function VersioneField({
    value,
    onChange,
    error,
    helperText,
    showTooltip = false,
}: Readonly<{
    value: string;
    onChange: (v: string) => void;
    error?: boolean;
    helperText?: string;
    showTooltip?: boolean;
}>) {
    return (
        <TextField
            fullWidth
            required
            InputLabelProps={{ required: false }}
            label="Versione *"
            placeholder="es. v1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={error}
            helperText={helperText}
            InputProps={showTooltip ? {
                endAdornment: (
                    <InputAdornment  position="end">
                        <Tooltip title={TOOLTIP_VERSIONE} arrow placement="top">
                            <span style={{ display: 'flex', cursor: 'pointer' }}>
                                <InfoIcon sx={{ fontSize: 20, color: 'text.primary' }} />
                            </span>
                        </Tooltip>
                    </InputAdornment>
                ),
            } : undefined}
        />
    );
}