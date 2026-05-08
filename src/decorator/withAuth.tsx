import { useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setOrganization } from '../redux/slices/organizationSlice';
import ROUTES from '../routes';
import { getOrganizationFromStorage } from '../utils/organization';
import { Box, CircularProgress } from '@mui/material';

export default function withAuth<T extends object>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithAuth = (props: T) => {
        const organization = useAppSelector((state) => state.organization.organization);
        const tppId = useAppSelector((state) => state.organization.tppId);
        const tppIdChecked = useAppSelector((state) => state.organization.tppIdChecked);
        const dispatch = useAppDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            if (!organization) {
                const storedOrganization = getOrganizationFromStorage();
                if (storedOrganization) {
                    dispatch(setOrganization(storedOrganization));
                } else {
                    void navigate(ROUTES.AUTH, { replace: true });
                }
            }
        }, [dispatch, navigate, organization]);

        if (!organization) return <></>;

        if (!tppIdChecked) {
            return (
                <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            );
        }

        if (!tppId) {
            return <Navigate to={ROUTES.ONBOARDING} replace />;
        }

        return <WrappedComponent {...props} />;
    };

    ComponentWithAuth.displayName = `withAuth(${displayName})`;
    return ComponentWithAuth;
}