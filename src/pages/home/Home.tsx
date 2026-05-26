import { Box, Button, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getTppProfile } from '../../api/tpp';
import ROUTES from '../../routes';
import { DeepLinkSection } from './components/DeepLinkSection';
import { EndpointSection } from './components/EndpointSection';
import HomeSkeleton from './components/HomeSkeleton';
import { sxSectionTitle, sxFieldLabel } from '../../theme/typography';
import ErrorContent from '../../components/ErrorContent';
import { useSafeFetch } from '../../hook/useSafeFetch';
import { useAppSelector } from '../../redux/hook';
import { selectSessionError } from '../../redux/slices/sessionSlice';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, loading, fetchError } = useSafeFetch(() => getTppProfile());

    const sessionError = useAppSelector(selectSessionError);
    const overviewData = data;

    if (loading) return <HomeSkeleton />;
    if (sessionError) return null;
    if (fetchError) return <ErrorContent />;

    const onModify = () => {
        void navigate(ROUTES.ENDPOINT_MODIFY, { replace: true });
    };

    return (
        <Box display="flex" sx={{ padding: 3, gap: 3 }} flexDirection="column">

            {/* Header */}
            <Typography sx={{ ...sxSectionTitle, fontSize: '28px', lineHeight: '36px' }}>
                {t('home.title')}
            </Typography>

            {/* Two-column layout */}
            <Box display="flex" gap={3} alignItems="flex-start">

                {/* LEFT column */}
                <Box display="flex" flexDirection="column" gap={3} flex={1}>

                    {/* and now? card */}
                    <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={sxSectionTitle}>{t('home.nowCard.title')}</Typography>
                        <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                            {t('home.nowCard.description')}
                        </Typography>
                        <Box>
                            <Button
                                variant="contained"
                                onClick={() => void navigate(ROUTES.CREDENTIALS)}
                            >
                                {t('home.nowCard.button')}
                            </Button>
                        </Box>
                    </Paper>

                    {/* Configuration endpoint */}
                    {overviewData && (
                        <EndpointSection
                            messageUrl={overviewData.messageUrl}
                            authenticationUrl={overviewData.authenticationUrl}
                            authenticationType={overviewData.authenticationType}
                            onModify={onModify}
                        />
                    )}
                </Box>

                {/* RIGHT column — Configuration deep link */}
                {overviewData?.agentLinks && (
                    <Box flex={1}>
                        <DeepLinkSection
                            agentLinks={overviewData.agentLinks}
                            onModify={onModify}
                        />
                    </Box>
                )}

            </Box>
        </Box>
    );
};

export default Home;
