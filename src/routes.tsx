import { lazy } from 'react';

const ROUTES = {
    HOME: `/`,
    AUTH: `/auth`,
    ONBOARDING: '/onboarding',
    CREDENTIALS: '/credentials',
    CREDENTIALS_MODIFY: '/credentials/modify',
    ENDPOINT_MODIFY: `/endpoint/modify`,
    PRIVACY: `/privacy`,
};

export default ROUTES;


export const Auth               = lazy(() => import('./pages/auth/Auth'));
export const Home               = lazy(() => import('./pages/home/Home'));
export const Onboarding         = lazy(() => import('./pages/onboarding/Onboarding'));
export const Credentials        = lazy(() => import('./pages/credentials/Credentials'));
export const CredentialsModify  = lazy(() => import('./pages/credentials/modify/CredentialsModify'));
export const EndpointModify     = lazy(() => import('./pages/home/modify/EndpointModify'));
export const PrivacyPage        = lazy(() => import('./pages/PrivacyPage'));
