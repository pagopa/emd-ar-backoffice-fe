import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface Props {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    context?: 'navigate' | 'reload'; // opzionale per futuro uso
}

export const UnsavedChangesDialog = ({ open, onConfirm, onCancel }: Props) => (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Modifiche non salvate</DialogTitle>
        <DialogContent>
            <Typography variant="body2" color="text.secondary">
                Hai delle modifiche non salvate. Se esci ora le perderai.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={onCancel}>
                Annulla
            </Button>
            <Button variant="contained" onClick={onConfirm}>
                Esci senza salvare
            </Button>
        </DialogActions>
    </Dialog>
);