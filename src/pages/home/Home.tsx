import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getOverview } from '../../api/tpp';
import ROUTES from '../../routes';
import { DeepLinkSection } from './components/DeepLinkSection';
import { EndpointSection } from './components/EndpointSection';
import HomeSkeleton from './components/HomeSkeleton';
import type { EndpoinLinkPageDto } from '../../types/tpp';
import { sxSectionTitle, sxFieldLabel } from '../../theme/typography';

const Home = () => {
    const [overviewData, setOverviewData] = useState<EndpoinLinkPageDto>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        void getOverview().then((data) => {
            setOverviewData(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <HomeSkeleton />;
    }

    const onModify = () => {
        void navigate(ROUTES.HOME, { replace: true });
    };

    return (
        <Box display="flex" sx={{ padding: 3, gap: 3 }} flexDirection="column">

            {/* Header */}
            <Typography sx={{ ...sxSectionTitle, fontSize: '28px', lineHeight: '36px' }}>
                Panoramica
            </Typography>

            {/* Two-column layout */}
            <Box display="flex" gap={3} alignItems="flex-start">

                {/* LEFT column */}
                <Box display="flex" flexDirection="column" gap={3} flex={1}>

                    {/* and now? card */}
                    <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={sxSectionTitle}>E ora?</Typography>
                        <Typography sx={{ ...sxFieldLabel, color: 'text.secondary' }}>
                            Visualizza e gestisci le credenziali per la connessione con i sistemi di PagoPA.
                        </Typography>
                        <Box>
                            <Button
                                variant="contained"
                                onClick={() => void navigate(ROUTES.CREDENTIALS)}
                            >
                                Gestisci credenziali
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