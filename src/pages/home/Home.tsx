import { Box, Typography } from '@mui/material';
import Header from '../../components/PagoPaHeader';
import Footer from '../../components/PagoPaFooter';

const Home = () => (
    <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />

        <Box component="main" flex={1} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4">Hello World</Typography>
        </Box>

        <Footer />
    </Box>
);

export default Home;