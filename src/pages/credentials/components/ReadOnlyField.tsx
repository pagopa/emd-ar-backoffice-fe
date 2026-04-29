import { useState } from 'react';

import {
    ContentCopy as CopyIcon,
    Visibility as EyeOn,
    VisibilityOff as EyeOff} from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';

interface ReadonlyFieldProps {
    label: string;
    value: string;
    secret?: boolean;
}

export const ReadonlyField = ({ label, value, secret = false }: ReadonlyFieldProps) => {
    const [visible, setVisible] = useState(!secret);

    const handleCopy = () => {
        void navigator.clipboard.writeText(value);
    };

    return (
        <Box display="flex" flexDirection="column" gap={0.5}>
            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="caption" fontWeight={600} color="text.secondary">
                    {label}
                </Typography>
                {secret && (
                    <IconButton size="small" onClick={() => setVisible((v) => !v)}>
                        {visible ? (
                            <EyeOff fontSize="small" />
                        ) : (
                            <EyeOn fontSize="small" />
                        )}
                    </IconButton>
                )}
            </Box>
            <TextField
                value={visible ? value : '••••••••••••••••'}
                size="small"
                style={{ maxWidth: "558px" }}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={handleCopy}>
                                <CopyIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};