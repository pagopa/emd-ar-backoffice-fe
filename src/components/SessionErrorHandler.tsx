import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Typography
} from '@mui/material';
import { CONFIG } from '../config';
import { useAppSelector } from '../redux/hook';

const DIALOG_CONFIG = {
    UNAUTHORIZED: {
        title: 'Sessione scaduta',
        message: 'Il tuo accesso non è più valido. Effettua nuovamente il login.',
    },
    FORBIDDEN: {
        title: 'Accesso negato',
        message: 'Non hai i permessi per accedere a questa risorsa.',
    },
} as const;

export default function SessionErrorHandler() {
    const error = useAppSelector((state) => state.session.error);
    const organization = useAppSelector((state) => state.organization.organization);

    if (!error) return null;

    const arUrl = organization?.id
        ? `${CONFIG.AR_BASE_URL}/dashboard/${organization.id}`
        : `${CONFIG.AR_BASE_URL}/dashboard`;

    const cfg = DIALOG_CONFIG[error];

    return (
        <Dialog open>
            <DialogTitle>{cfg.title}</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary">
                    {cfg.message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" href={arUrl}>
                    Torna all&apos;Area Riservata
                </Button>
            </DialogActions>
        </Dialog>
    );
}