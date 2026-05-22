import { InfoOutlined as InfoIcon } from '@mui/icons-material';
import { InputAdornment, TextField, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const dl = 'onboarding.step1.deepLink';

    return (
        <TextField
            fullWidth
            required
            label={t(`${dl}.versionLabel`)}
            placeholder={t(`${dl}.versionPlaceholder`)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={error}
            helperText={helperText}
            inputProps={{ maxLength: 50 }}
            InputProps={
                showTooltip
                    ? {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title={t(`${dl}.versionTooltip`)} arrow placement="top">
                                    <span style={{ display: 'flex', cursor: 'pointer' }}>
                                        <InfoIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                    </span>
                                </Tooltip>
                            </InputAdornment>
                        ),
                        sx: { paddingRight: 0 },
                    }
                    : undefined
            }
        />
    );
}