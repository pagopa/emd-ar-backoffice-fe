import { Box, Button, Link, Typography } from '@mui/material';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface ErrorContentProps {
    arUrl?: string;
}

export default function ErrorContent({ arUrl }: ErrorContentProps = {}) {
    const { t } = useTranslation();
    
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            p={4}
            height="100%"
        >
            <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
            <Typography variant="h6">{t('error.title')}</Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
                {t('error.description')}
            </Typography>
            <Button variant="outlined" onClick={() => window.location.reload()}>
                {t('commonLabel.retry')}
            </Button>
            {arUrl && (
                <Link href={arUrl} underline="always" color="primary" variant="body2">
                    {t('commonLabel.backToArea')}
                </Link>
            )}
        </Box>
    );
}