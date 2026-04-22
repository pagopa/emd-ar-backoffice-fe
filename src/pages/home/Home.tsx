import { Box, Chip, Typography } from '@mui/material';
import Layout from '../../components/layoutPages/Layout';
import { useAppSelector } from '../../redux/hook';

const Home = () => {
    const tppId = useAppSelector((state) => state.organization.tppId);

    return (
        <Layout isSidebarEnabled={true}>
            <Box component="main" flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
                <Typography variant="h4">Hello World</Typography>
                {tppId && (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary">
                            TPP ID:
                        </Typography>
                        <Chip label={tppId} variant="outlined" size="small" />
                    </Box>
                )}
            </Box>
        </Layout>
    )
};

export default Home;