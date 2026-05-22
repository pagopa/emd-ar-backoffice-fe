import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const UnsavedChangesDialog = ({ open, onConfirm, onCancel }: Props) => {
    const { t } = useTranslation();
    
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{t('unsavedChangesDialog.title')}</DialogTitle>

            <DialogContent>
                <Typography variant="body2" color="text.secondary">
                    {t('unsavedChangesDialog.description')}
                </Typography>
            </DialogContent>
            <DialogActions style={{ padding: 18 }}>
                <Button autoFocus variant="outlined" onClick={onCancel}>
                    {t('commonLabel.cancel')}
                </Button>
                <Button variant="contained" onClick={onConfirm}>
                    {t('unsavedChangesDialog.exitWithoutSaving')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}