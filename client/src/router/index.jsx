import { createBrowserRouter, Navigate } from 'react-router-dom';
import BlankLayout from '../components/layout/BlankLayout';
import DefaultLayout from '../components/layout/DefaultLayout';
import { routes } from './routes';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? children : <Navigate to="/login" />;
};

const finalRoutes = routes.map((route) => {
    // For routes that should be wrapped with PrivateRoute
    if (route.private) {
        return {
            ...route,
            element: (
                <PrivateRoute>
                    <DefaultLayout>{route.element}</DefaultLayout>
                </PrivateRoute>
            ),
        };
    }
    
    // For public routes with blank layout
    if (route.layout === 'blank') {
        return {
            ...route,
            element: <BlankLayout>{route.element}</BlankLayout>,
        };
    }
    
    // For public routes with default layout
    return {
        ...route,
        element: <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
