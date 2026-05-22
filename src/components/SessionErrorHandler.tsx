import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Typography
} from '@mui/material';
import { CONFIG } from '../config';
import { useAppSelector } from '../redux/hook';
import { useTranslation } from 'react-i18next';


export default function SessionErrorHandler() {
    const { t } = useTranslation();
    const error = useAppSelector((state) => state.session.error);
    const organization = useAppSelector((state) => state.organization.organization);

    if (!error) return null;

    const arUrl = organization?.id
        ? `${CONFIG.AR_BASE_URL}/dashboard/${organization.id}`
        : `${CONFIG.AR_BASE_URL}/dashboard`;


    return (
        <Dialog open>
            <DialogTitle>
                {error === 'UNAUTHORIZED'
                    ? t('sessionError.unauthorized.title')
                    : t('sessionError.forbidden.title')}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary">
                    {error === 'UNAUTHORIZED'
                        ? t('sessionError.unauthorized.message')
                        : t('sessionError.forbidden.message')}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" href={arUrl}>
                    {t('commonLabel.backToArea')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}