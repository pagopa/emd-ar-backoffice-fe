import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = ({ overlay = true }) => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={overlay ? {
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(255,255,255,0.7)',
            zIndex: 9999,
        } : {
            minHeight: '100vh',
        }}
    >
        <CircularProgress />
    </Box>
);

export default LoadingScreen;