import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Lazy load route components for code-splitting
const Layout = lazy(() => import('@/components/Layout/Layout'));
const GiveConsentPage = lazy(() => import('@/features/consent/pages/GiveConsentPage/GiveConsentPage'));
const ConsentsPage = lazy(() => import('@/features/consent/pages/ConsentsPage/ConsentsPage'));

// Define application routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <GiveConsentPage /> },
      { path: 'consents', element: <ConsentsPage /> }
    ]
  }
]);
