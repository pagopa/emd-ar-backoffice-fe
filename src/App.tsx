import './i18n';
import { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import './index.css';

import SessionErrorHandler from './components/SessionErrorHandler';
import withAuth from './decorator/withAuth';
import { useAppSelector } from './redux/hook';
import ROUTES, { Auth, Credentials, CredentialsModify, EndpointModify, Home, Onboarding } from './routes';

import { ErrorBoundary } from '@pagopa/selfcare-common-frontend/lib';
import UserNotifyHandle from '@pagopa/selfcare-common-frontend/lib/components/UserNotifyHandle';
import Layout from './components/layoutPages/Layout';
import { CircularProgress, Box } from '@mui/material';
import { useInitSession } from './hook/useInitSession';

function Root() {
    useInitSession();
    return (
        <ErrorBoundary>
            <SessionErrorHandler />
            <UserNotifyHandle />
            {/* Suspense cover all lazy routes */}
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </ErrorBoundary>
    );
}

const ProtectedOnboarding = () => {
    const tppId = useAppSelector((state) => state.organization.tppId);
    const tppIdChecked = useAppSelector((state) => state.organization.tppIdChecked);

    if (!tppIdChecked) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return tppId ? <Navigate to={ROUTES.HOME} replace /> : <Onboarding />;
};

const AuthOutlet = withAuth(() => <Outlet />);
const LayoutWithSidebar = () => <Layout showSidebar><Outlet /></Layout>;
const LayoutWithoutSidebar = () => <Layout><Outlet /></Layout>;

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: ROUTES.AUTH, element: <Auth /> },
            {
                element: <AuthOutlet />,
                children: [
                    {
                        element: <LayoutWithSidebar />,
                        children: [
                            { index: true, element: <Home /> },
                            { path: ROUTES.CREDENTIALS, element: <Credentials /> },
                        ],
                    },
                    {
                        element: <LayoutWithoutSidebar />,
                        children: [
                            { path: ROUTES.ONBOARDING, element: <ProtectedOnboarding /> },
                            { path: ROUTES.CREDENTIALS_MODIFY, element: <CredentialsModify /> },
                            { path: ROUTES.ENDPOINT_MODIFY, element: <EndpointModify /> },
                            { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
                        ],
                    },
                ],
            },
        ],
    },
]);