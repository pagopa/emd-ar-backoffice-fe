import { Box } from '@mui/material';
import React from 'react';
import PagoPaHeader from './PagoPaHeader';
import SideMenu from './SideMenu';
import PagoPaFooter from './PagoPaFooter';

type Props = {
    children?: React.ReactNode;
};


const Layout = ({ children }: Props) => {


    return (
        <Box
            display="grid"
            gridTemplateColumns="1fr"
            gridTemplateRows="auto 1fr auto"
            gridTemplateAreas={`"header"
                          "body"
                          "footer"`}
            minHeight="100vh"
        >
            <Box gridArea="header">
                <PagoPaHeader />
            </Box>
            <Box gridArea="body" display="grid" gridTemplateColumns="minmax(300px, 2fr) 10fr">
                <Box gridColumn="auto" sx={{ backgroundColor: 'background.paper' }}>
                    <SideMenu />
                </Box>
                <Box
                    gridColumn="auto"
                    sx={{ backgroundColor: '#F5F5F5' }}
                    display="grid"
                    justifyContent="center"
                    pb={16}
                    pt={2}
                    px={2}
                    gridTemplateColumns="1fr"
                >
                    {children}
                </Box>
            </Box>
            <Box gridArea="footer">
                <PagoPaFooter />
            </Box>
        </Box>
    );
};
export default Layout;