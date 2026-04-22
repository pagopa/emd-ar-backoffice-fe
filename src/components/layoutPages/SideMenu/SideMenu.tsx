import { List, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import {
    VpnKeyOutlined as CredentialIcon,
    ImageOutlined as DasboardIcon,
} from '@mui/icons-material';
import SidenavItem from './SidenavItem';
import ROUTES from '../../../routes';
import { CONFIG } from '../../../config';
import { useAppSelector } from '../../../redux/hook';

/** The side menu of the application */
export default function SideMenu() {
    const navigate = useNavigate();
    const onExit = useUnloadEventOnExit();
    const location = useLocation();
    const organization = useAppSelector((state) => state.organization.organization);


    //TODO aggiungere presa di selfacareId per reinderizzare in pagina utenti e pagina groups

    return (
        <Box display="grid" mt={1}>
            <Box gridColumn="auto">
                <List data-testid="list-test">
                    <SidenavItem
                        title="Panoramica"
                        icon={DasboardIcon}
                        level={0}
                        handleClick={() => onExit(() => void navigate(ROUTES.HOME, { replace: true }))}
                        isSelected={location.pathname === ROUTES.HOME}
                    />
                    <SidenavItem
                        title="Credenziali"
                        icon={CredentialIcon}
                        level={0}
                        handleClick={() => onExit(() => void navigate(ROUTES.CREDENTIALS, { replace: true }))}
                        isSelected={location.pathname === ROUTES.CREDENTIALS}
                    />
                    <Box border={1} borderColor={"#F5F5F5"} boxShadow={10}></Box>
                    <SidenavItem
                        title="Utenti"
                        icon="/icons/users.svg"
                        level={0}
                        href={organization? `${CONFIG.AR_BASE_URL}/dashboard/${organization.id}/users` :  `${CONFIG.AR_BASE_URL}/dashboard`}
                        target="_blank"
                    />
                    <SidenavItem
                        title="Gruppi"
                        icon="/icons/groups.svg"
                        level={0}
                        href={organization? `${CONFIG.AR_BASE_URL}/dashboard/${organization.id}/groups` :  `${CONFIG.AR_BASE_URL}/dashboard`}
                        target="_blank"
                    />
                </List>
            </Box>
        </Box>
    );
}