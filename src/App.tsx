import { useEffect } from 'react';

import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import './index.css'

import SessionErrorHandler from './components/SessionErrorHandler';
import withAuth from './decorator/withAuth';
import Auth from './pages/auth/Auth';
import Credentials from './pages/credentials/Credentials';
import CredentialsModify from './pages/credentials/modify/CredentialsModify';
import Home from './pages/home/Home';
import Onboarding from './pages/onboarding/Onboarding';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { setOrganization, setTppId } from './redux/slices/organizationSlice';
import ROUTES from './routes';
import { getOrganizationFromStorage } from './utils/organization';

import { ErrorBoundary } from '@pagopa/selfcare-common-frontend/lib';
import { userActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import Layout from './components/layoutPages/Layout';

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


function Root() {
    useInitSession();
    return (
        <ErrorBoundary>
            <SessionErrorHandler />
            <Outlet />
        </ErrorBoundary>
    );
}


const ProtectedOnboarding = () => {
    const tppId = useAppSelector((state) => state.organization.tppId)
        ?? localStorage.getItem('acs_tpp_id');

    return tppId
        ? <Navigate to={ROUTES.HOME} replace />
        : <Onboarding />;
};

const AuthOutlet = withAuth(() => <Outlet />);
const LayoutWithSidebar = () => <Layout showSidebar><Outlet /></Layout>
const LayoutWithoutSidebar = () => <Layout><Outlet /></Layout>

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: 'auth', element: <Auth /> },
            {
                element: <AuthOutlet />,
                children: [
                    {
                        element: <LayoutWithSidebar/>,
                        children: [
                            { index: true, element: <Home /> },
                            { path: 'credentials', element: <Credentials /> },
                        ],
                    },
                    {
                        element: <LayoutWithoutSidebar />,
                        children: [
                            { path: 'onboarding', element: <ProtectedOnboarding /> },
                            { path: 'credentials/modify', element: <CredentialsModify /> },
                            { path: '*', element: <Navigate to="/" replace /> },
                        ],
                    },
                ],
            },
        ],
    },
]);