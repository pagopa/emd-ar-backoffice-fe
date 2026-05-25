import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { CONFIG } from '../config';

interface AssistanceDialogProps {
    open: boolean;
    onClose: () => void;
}

const AssistanceDialog = ({ open, onClose }: AssistanceDialogProps) => {
    const { t } = useTranslation();

    const email = CONFIG.ASSISTANCE_EMAIL ?? '';
    const subject = encodeURIComponent('Richiesta assistenza');

    const providers = [
        {
            label: 'Outlook 365',
            href: `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(email)}&subject=${subject}`,
        },
        {
            label: 'Gmail',
            href: `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}`,
        },
        {
            label: t('header.assistancePopover.externalApp'),
            href: `mailto:${email}?subject=${subject}`,
        },
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle variant="body1" fontWeight={600}>
                {t('header.assistancePopover.title')}
            </DialogTitle>
            <DialogContent>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    {t('header.assistancePopover.subtitle')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {providers.map((p) => (
                        <Button
                            key={p.label}
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                window.open(p.href, '_blank', 'noopener,noreferrer');
                                onClose();
                            }}
                            sx={{ justifyContent: 'flex-start' }}
                        >
                            {p.label}
                        </Button>
                    ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            {t('header.assistancePopover.orCopy')}
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {email}
                        </Typography>
                    </Box>
                    <Tooltip title={t('header.assistancePopover.copy')} arrow>
                        <IconButton
                            size="small"
                            onClick={() => {
                                void navigator.clipboard.writeText(email);
                                onClose();
                            }}
                        >
                            <CopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AssistanceDialog;