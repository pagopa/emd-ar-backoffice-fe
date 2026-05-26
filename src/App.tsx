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
import { useInitSession } from './hook/useInitSession';
import LoadingScreen from './components/LoadingScreen';
import EnvironmentBanner from './components/EnvironmentBanner';
import ErrorContent from './components/ErrorContent';
import { CONFIG } from './config';
import { useTranslation } from 'react-i18next';

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

function useArUrl() {
    const organization = useAppSelector((state) => state.organization.organization);
    return organization?.id
        ? `${CONFIG.AR_BASE_URL}/dashboard/${organization.id}`
        : `${CONFIG.AR_BASE_URL}/dashboard`;
}

const ProtectedOnboarding = () => {
    const tppRegistered = useAppSelector((state) => state.organization.tppRegistered);
    const tppIdChecked = useAppSelector((state) => state.organization.tppIdChecked);
    const checkFailed = useAppSelector((state) => state.organization.checkFailed);
    const arUrl = useArUrl();

    if (!tppIdChecked) return <LoadingScreen />;
    if (checkFailed) return <ErrorContent arUrl={arUrl} />;

    return tppRegistered ? <Navigate to={ROUTES.HOME} replace /> : <Onboarding />;
};

const TppOutlet = () => {
    const tppRegistered = useAppSelector((state) => state.organization.tppRegistered);
    const tppIdChecked = useAppSelector((state) => state.organization.tppIdChecked);
    const checkFailed = useAppSelector((state) => state.organization.checkFailed);
    const arUrl = useArUrl();

    if (!tppIdChecked) return <LoadingScreen />;
    if (checkFailed) return <ErrorContent arUrl={arUrl} />

    return tppRegistered ? <Outlet /> : <Navigate to={ROUTES.ONBOARDING} replace />;
};


const AuthOutlet = withAuth(() => <Outlet />);
const LayoutWithSidebar = () => {
    const { t } = useTranslation();
    return (
        <>
            {CONFIG.ENV !== 'PROD' && <EnvironmentBanner message={t('environmentBanner.message')} />}
            <Layout showSidebar>
                <Outlet />
            </Layout>
        </>
    )
};
const LayoutWithoutSidebar = () => {
    const { t } = useTranslation();
    return (
        <>
            {CONFIG.ENV !== 'PROD' && <EnvironmentBanner message={t('environmentBanner.message')} />}
            <Layout>
                <Outlet />
            </Layout>
        </>
    )
};

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
                        element: <LayoutWithoutSidebar />,
                        children: [
                            { path: ROUTES.ONBOARDING, element: <ProtectedOnboarding /> },
                        ],
                    },
                    {
                        element: <TppOutlet />,
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
                                    { path: ROUTES.CREDENTIALS_MODIFY, element: <CredentialsModify /> },
                                    { path: ROUTES.ENDPOINT_MODIFY, element: <EndpointModify /> },
                                    { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);