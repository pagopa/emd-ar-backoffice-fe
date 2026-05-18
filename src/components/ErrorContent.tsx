import { Box, Button, Typography } from '@mui/material';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';


export default function ErrorContent() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center"
            justifyContent="center" gap={2} p={4} height="100%">
            <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
            <Typography variant="h6">Qualcosa è andato storto</Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
                Non è stato possibile caricare le informazioni. Riprova più tardi.
            </Typography>
            <Button variant="outlined" onClick={() => window.location.reload()}>
                Riprova
            </Button>
        </Box>
    );
}