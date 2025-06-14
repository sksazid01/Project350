// routes.jsx
import { lazy } from 'react';
import PrivateRoute from './PrivateRoute';

// Public routes
const Index = lazy(() => import('../pages/index'));
const Login = lazy(() => import('../pages/login'));
const Signup = lazy(() => import('../pages/signup'));
const ResetPassword = lazy(() => import('../pages/reset-password'));
const Error404 = lazy(() => import('../pages/404'));
const AboutUs = lazy(() => import('../pages/about-us'));
const ContactUs = lazy(() => import('../pages/contact-us'));
const Termsandconditions = lazy(() => import('../pages/termsConditions'));
const PrivacyPolicy = lazy(() => import('../pages/privacyPolicy'));

const Test = lazy(() => import('../pages/test'));
const Profile = lazy(() => import('../pages/profile'));
const VerifyEmail = lazy(() => import('../pages/verify-email'));
const OTPVerification = lazy(() => import('../pages/otp-verification'));
//const GoogleCallback = lazy(() => import('../components/GoogleCallback'));

// Private routes
const Dashboard = lazy(() => import('../pages/dashboard'));
const JoinClub = lazy(() => import('../pages/joinClub'));
const MyClubs = lazy(() => import('../pages/myclubs'));
const Events = lazy(() => import('../pages/EventsPage'));
const Settings = lazy(() => import('../pages/Settings'));
const ChangePassword = lazy(() => import('../pages/changePassword'));
const PaymentSuccess = lazy(() => import('../pages/payment-success'));
const PaymentFailed = lazy(() => import('../pages/payment-failed'));
const PaymentCancelled = lazy(() => import('../pages/payment-cancelled'));

const routes = [
  // Public routes
  { path: '/', element: <Index />, layout: 'blank' },
  { path: '/login', element: <Login />, layout: 'blank' },
  { path: '/signup', element: <Signup />, layout: 'blank' },
  { path: '/otp-verification', element: <OTPVerification />, layout: 'blank' },
  { path: '/reset-password', element: <ResetPassword />, layout: 'blank' },
  { path: '/about-us', element: <AboutUs />, layout: 'blank' },
  { path: '/contact-us', element: <ContactUs />, layout: 'blank' },
  { path: '/terms-conditions', element: <Termsandconditions />, layout: 'blank' },
  { path: '/privacy-policy', element: <PrivacyPolicy />, layout: 'blank' },
  
  { path: '/test', element: <Test />, layout: 'blank' },
  { path: '/profile/:studentId', element: <Profile />, layout: 'blank'},
  { path: '/verify-email', element: <VerifyEmail />, layout: 'blank'},

  //{ path: '/auth/google/callback', element: <GoogleCallback />},
  // Payment routes (public)
  { path: '/payment-success/:tranId', element: <PaymentSuccess />, layout: 'blank' },
  { path: '/payment-failed/:tranId', element: <PaymentFailed />, layout: 'blank' },
  { path: '/payment-cancelled/:tranId', element: <PaymentCancelled />, layout: 'blank' },

  // Private routes
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: 'dashboard', element: <JoinClub />},
      { path: 'join', element: <JoinClub />},
      { path: 'events', element: <Events />},
      { path: 'clubs', element: <MyClubs />},
      { path: 'user/settings', element: <Settings />},
      { path: 'user/change-password', element: <ChangePassword />},
    ],
  },

  // Catch-all route for 404 errors
  { path: '*', element: <Error404 />, layout: 'blank' },
 
];

export { routes };
