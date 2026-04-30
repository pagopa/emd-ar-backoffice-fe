import React, { useState } from 'react';

import { Box } from '@mui/material';

import PagoPaFooter from './PagoPaFooter';
import PagoPaHeader from './PagoPaHeader';
import SideMenu from './SideMenu/SideMenu';

type Props = {
    children?: React.ReactNode;
    showSidebar?: boolean;
};


const Layout = ({ children, showSidebar = false }: Props) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <Box
            display="grid"
            gridTemplateColumns="1fr"
            gridTemplateRows="auto 1fr auto"
            gridTemplateAreas={`"header" "body" "footer"`}
            minHeight="100vh"
        >
            <Box gridArea="header">
                <PagoPaHeader />
            </Box>
            <Box
                gridArea="body"
                display="grid"
                gridTemplateColumns={
                    showSidebar
                        ? sidebarCollapsed
                            ? '64px 1fr'      
                            : 'minmax(300px, 2fr) 10fr'
                        : '1fr'
                }
                sx={{ transition: 'grid-template-columns 0.2s ease' }}
            >
                {showSidebar && (
                    <Box gridColumn="auto" sx={{ backgroundColor: 'background.paper', height: '100%' }}>
                        <SideMenu
                            collapsed={sidebarCollapsed}
                            onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
                        />
                    </Box>
                )}
                <Box
                    gridColumn="auto"
                    sx={{ backgroundColor: '#F5F5F5' }}
                    display="grid"
                    justifyContent="center"
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