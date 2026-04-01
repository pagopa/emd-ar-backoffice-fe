import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@pagopa/selfcare-common-frontend/lib';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import ROUTES from './routes';
import withAuth from './decorator/withAuth';

const SecuredRoutes = withAuth(() => (
    <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
));


export default function App() {



    return (
        <ErrorBoundary>
            <Routes>
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path="*" element={<SecuredRoutes />} />
            </Routes>
        </ErrorBoundary>
    );
}