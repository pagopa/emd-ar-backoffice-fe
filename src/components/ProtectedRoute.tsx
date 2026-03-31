import { Navigate, Outlet } from 'react-router-dom';
import { getUserFromStorage } from '../utils/user';
import { type UserRole } from '../types/user';
import ROUTES from '../routes';

type Props = {
    allowedRoles?: UserRole[];
};

const ProtectedRoute = ({ allowedRoles }: Props) => {

    const user = getUserFromStorage();

    if (!user) {
        return <Navigate to={ROUTES.AUTH} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;