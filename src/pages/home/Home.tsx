import { Box, Typography } from '@mui/material';
import PageLayout from '../../components/PageLayout';

const Home = () => (
    <PageLayout>
        <Box component="main" flex={1} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4">Hello World</Typography>
        </Box>
    </PageLayout>
);

export default Home;