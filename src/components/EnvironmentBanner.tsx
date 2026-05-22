import { Warning as WarningIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

type Props = {
    message: string;
};

const EnvironmentBanner = ({ message }: Props) => (
    <Box
        role="alert"
        sx={{
            width: '100%',
            backgroundColor: '#FFF5DA',
            display: 'flex',
            top: 0,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            px: 3,
            py: 1,
            zIndex: 300
        }}
    >
        <WarningIcon sx={{ color: '#614C15', fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: '#614C15', fontWeight: 600 }}>
            {message}
        </Typography>
    </Box>
);

export default EnvironmentBanner;