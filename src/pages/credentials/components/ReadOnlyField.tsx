import { useState } from 'react';

import {
    ContentCopy as CopyIcon,
    VisibilityOutlined as EyeOn,
    VisibilityOffOutlined as EyeOff
} from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { sxCapFieldLabel } from '../../../theme/typography';

interface ReadonlyFieldProps {
    label: string;
    value: string;
    secret?: boolean;
}

export const ReadonlyField = ({ label, value, secret = false }: ReadonlyFieldProps) => {
    const [visible, setVisible] = useState(!secret);
    const valueHiden = value ? '•'.repeat(value.length) : '';

    const handleCopy = () => {
        void navigator.clipboard.writeText(value);
    };

    return (
        <Box display="flex" flexDirection="column" gap={0.5}>
            <Box display="flex" alignItems="center" gap={1}>
                <Typography sx={{ ...sxCapFieldLabel, color: 'text.secondary' }}>
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
                value={visible ? value : valueHiden}
                size="small"
                sx={{
                    maxWidth: '558px',
                    '& .MuiInputBase-input': {
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#17324D',
                        letterSpacing: 0,
                    },
                }}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={handleCopy}>
                                <CopyIcon fontSize="small" sx={{ transform: 'scaleY(-1)' }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};