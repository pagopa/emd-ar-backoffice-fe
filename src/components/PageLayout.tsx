import { Box } from "@mui/material";
import Footer from "./PagoPaFooter";
import Header from "./PagoPaHeader";

const PageLayout = ({ children }: { children: React.ReactNode }) => (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="background.default">
        <Header />
        {children}
        <Footer />
    </Box>
);

export default PageLayout;