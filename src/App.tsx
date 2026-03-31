import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@pagopa/selfcare-common-frontend/lib';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import ROUTES from './routes';

export default function App() {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path={ROUTES.AUTH} element={<Auth />} />

                <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                </Route>


                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
        </ErrorBoundary>
    );
}