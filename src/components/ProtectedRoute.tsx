import { Navigate, Outlet } from 'react-router-dom';
import { getUserFromStorage } from '../utils/user';
import { type UserRole } from '../types/user';
import { CONFIG } from '../config';
import ROUTES from '../routes';

type Props = {
    allowedRoles?: UserRole[];
};

const ProtectedRoute = ({ allowedRoles }: Props) => {

    const user = getUserFromStorage();

    if (!user) {
        window.location.assign(CONFIG.AR_BASE_URL);
        return null;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;