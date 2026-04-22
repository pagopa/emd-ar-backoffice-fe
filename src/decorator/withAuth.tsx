import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setOrganization } from '../redux/slices/organizationSlice';
import { getOrganizationFromStorage } from '../utils/organization';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes';

export default function withAuth<T extends object>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithAuth = (props: T) => {
        const organization = useAppSelector((state) => state.organization.organization);
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

        return organization ? <WrappedComponent {...props} /> : <></>;
    };

    ComponentWithAuth.displayName = `withAuth(${displayName})`;
    return ComponentWithAuth;
}