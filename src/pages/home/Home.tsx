import { Box, Typography } from '@mui/material';
import Layout from '../../components/Layout';

const Home = () => (
    <Layout>
        <Box component="main" flex={1} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4">Hello World</Typography>
        </Box>
    </Layout>
);

export default Home;