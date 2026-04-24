import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Box
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { clearSessionError } from '../redux/slices/sessionSlice';
import { CONFIG } from '../config';

// 401 → dialog 
const UnauthorizedDialog = ({ onClose }: { onClose: () => void }) => {
    const organization = useAppSelector((state) => state.organization.organization);

    return (<Dialog open onClose={onClose}>
        <DialogTitle>Sessione scaduta</DialogTitle>
        <DialogContent>
            <Typography variant="body2" color="text.secondary">
                Il tuo accesso non è più valido. Effettua nuovamente il login.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button
                variant="outlined"
                href={organization?.id ? `${CONFIG.AR_BASE_URL}/dashboard/${organization.id}`:  `${CONFIG.AR_BASE_URL}/dashboard`}
            >
                Torna all&apos;Area Riservata
            </Button>
        </DialogActions>
    </Dialog>);
}

// 403, 500 → pagina full-screen
const ErrorPage = ({ title, message, onClose }: {
    title: string;
    message: string;
    onClose: () => void;
}) => (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
    >
        <Typography variant="h6" color="error">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{message}</Typography>
        <Button variant="outlined" onClick={onClose}>Riprova</Button>
    </Box>
);

const ERROR_CONFIG = {
    FORBIDDEN: {
        type: 'page' as const,
        title: 'Accesso negato',
        message: 'Non hai i permessi per accedere a questa risorsa.',
    },
    SERVER_ERROR: {
        type: 'page' as const,
        title: 'Errore del server',
        message: 'Si è verificato un problema. Riprova più tardi.',
    },
};

export default function SessionErrorHandler() {
    const error = useAppSelector((state) => state.session.error);
    const dispatch = useAppDispatch();
    const handleClose = () => dispatch(clearSessionError());

    if (!error) return null;

    if (error === 'UNAUTHORIZED') {
        return <UnauthorizedDialog onClose={handleClose} />;
    }

    const config = ERROR_CONFIG[error];
    return <ErrorPage {...config} onClose={handleClose} />;
}