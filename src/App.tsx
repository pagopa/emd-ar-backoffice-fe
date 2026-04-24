import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@pagopa/selfcare-common-frontend/lib';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Onboarding from './pages/onboarding/Onboarding';
import Credentials from './pages/credentials/Credentials';
import ROUTES from './routes';
import withAuth from './decorator/withAuth';
import './index.css'
import { useAppDispatch, useAppSelector } from './redux/hook';
import { useEffect } from 'react';
import { getOrganizationFromStorage } from './utils/organization';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { setOrganization, setTppId } from './redux/slices/organizationSlice';
import { userActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import SessionErrorHandler from './components/SessionErrorHandler';

export const useInitSession = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const organization = getOrganizationFromStorage();
        const tppId = localStorage.getItem('acs_tpp_id');
        const user = storageUserOps.read();

        if (organization) {
            dispatch(setOrganization(organization));
        }

        if (user) {
            dispatch(userActions.setLoggedUser(user));
        }
        if (tppId) {
            dispatch(setTppId(tppId))
        };
    }, [dispatch]);
};

const ProtectedOnboarding = () => {
    const tppId = useAppSelector((state) => state.organization.tppId)
        ?? localStorage.getItem('acs_tpp_id');

    return tppId
        ? <Navigate to={ROUTES.HOME} replace />
        : <Onboarding />;
};


const SecuredRoutes = withAuth(() => (
    <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ONBOARDING} element={<ProtectedOnboarding />} />
        <Route path={ROUTES.CREDENTIALS} element={<Credentials />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
));


export default function App() {

    useInitSession();


    return (
        <ErrorBoundary>
            <SessionErrorHandler />
            <Routes>
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path="*" element={<SecuredRoutes />} />
            </Routes>
        </ErrorBoundary>
    );
}