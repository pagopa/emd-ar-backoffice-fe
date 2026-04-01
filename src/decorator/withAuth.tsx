import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setUser } from '../redux/slices/userSlice';
import { getUserFromStorage } from '../utils/user';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes';

export default function withAuth<T extends object>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const ComponentWithAuth = (props: T) => {
        const user = useAppSelector((state) => state.user.user);
        const dispatch = useAppDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            if (!user) {
                const storedUser = getUserFromStorage();
                if (storedUser) {
                    dispatch(setUser(storedUser));
                } else {
                    void navigate(ROUTES.AUTH, { replace: true });
                }
            }
        }, [dispatch, navigate, user]);

        return user ? <WrappedComponent {...props} /> : <></>;
    };

    ComponentWithAuth.displayName = `withAuth(${displayName})`;
    return ComponentWithAuth;
}