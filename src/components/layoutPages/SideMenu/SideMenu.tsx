import {
    ImageOutlined as DasboardIcon,
    VpnKeyOutlined as CredentialIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import { Box, List, ListItemButton, ListItemIcon } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { CONFIG } from '../../../config';
import { useAppSelector } from '../../../redux/hook';
import ROUTES from '../../../routes';
import SidenavItem from './SidenavItem';

import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';

type SideMenuProps = {
    collapsed: boolean;
    onToggleCollapse: () => void;
};

/** The side menu of the application */
export default function SideMenu({ collapsed, onToggleCollapse }: SideMenuProps) {
    const navigate = useNavigate();
    const onExit = useUnloadEventOnExit();
    const location = useLocation();
    const organization = useAppSelector((state) => state.organization.organization);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{ backgroundColor: 'background.paper', height: '100%' }}
        >
            <Box>
                <List data-testid="list-test">
                    <SidenavItem
                        title="Panoramica"
                        icon={DasboardIcon}
                        level={0}
                        collapsed={collapsed}
                        handleClick={() => onExit(() => void navigate(ROUTES.HOME, { replace: true }))}
                        isSelected={location.pathname === ROUTES.HOME}
                    />
                    <SidenavItem
                        title="Credenziali"
                        icon={CredentialIcon}
                        level={0}
                        collapsed={collapsed}
                        handleClick={() => onExit(() => void navigate(ROUTES.CREDENTIALS, { replace: true }))}
                        isSelected={location.pathname === ROUTES.CREDENTIALS}
                    />
                    <Box border={1} borderColor="#F5F5F5" marginY={1} />
                    <SidenavItem
                        title="Utenti"
                        icon="/icons/users.svg"
                        level={0}
                        collapsed={collapsed}
                        href={organization ? `${CONFIG.AR_BASE_URL}/dashboard/${organization.id}/users` : `${CONFIG.AR_BASE_URL}/dashboard`}
                        target="_blank"
                    />
                    <SidenavItem
                        title="Gruppi"
                        icon="/icons/groups.svg"
                        level={0}
                        collapsed={collapsed}
                        href={organization ? `${CONFIG.AR_BASE_URL}/dashboard/${organization.id}/groups` : `${CONFIG.AR_BASE_URL}/dashboard`}
                        target="_blank"
                    />
                </List>
            </Box>

            {/* Toggle button */}
            <Box>
                <ListItemButton onClick={onToggleCollapse} sx={{ justifyContent: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
                        <MenuIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                </ListItemButton>
            </Box>
        </Box>
    );
}