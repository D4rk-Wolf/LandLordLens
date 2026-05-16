/**
 * ROUTE CONFIGURATION
 * Defines the navigation structure of the application using React Router 6.4+.
 * 
 * Key Features:
 * - Lazy Loading: Screens are imported continuously using `React.lazy()` to reduce initial bundle size.
 *   (The user only downloads code for the page they are visiting).
 * - Nested Routes: Layouts (like DashboardLayout) wrap child routes.
 * - Route Guards: `RequireAuth` component protects private routes (redirects to login if not authenticated).
 */

import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import { RequireAuth } from './components/auth/RequireAuth';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import TenantInviteScreen from './screens/auth/TenantInviteScreen';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy load screens
const DashboardScreen = lazy(() => import('./screens/dashboard/DashboardScreen'));
const PropertiesScreen = lazy(() => import('./screens/properties/PropertiesScreen'));
const PropertyDetailScreen = lazy(() => import('./screens/properties/PropertyDetailScreen'));
const NewPropertyScreen = lazy(() => import('./screens/properties/NewPropertyScreen'));
const NewTenancyScreen = lazy(() => import('./screens/properties/NewTenancyScreen'));
const NewComplianceScreen = lazy(() => import('./screens/properties/NewComplianceScreen'));
const ComplianceScreen = lazy(() => import('./screens/compliance/ComplianceScreen'));
const MaintenanceScreen = lazy(() => import('./screens/maintenance/MaintenanceScreen'));
const NewMaintenanceScreen = lazy(() => import('./screens/maintenance/NewMaintenanceScreen'));
const InspectionsScreen = lazy(() => import('./screens/inspections/InspectionsScreen'));
const ExpensesScreen = lazy(() => import('./screens/expenses/ExpensesScreen'));
const DepositProtectionScreen = lazy(() => import('./screens/tenancies/DepositProtectionScreen'));
const RightToRentScreen = lazy(() => import('./screens/tenancies/RightToRentScreen'));
const TenantBackgroundCheckScreen = lazy(() => import('./screens/tenancies/TenantBackgroundCheckScreen'));
const InventoryScreen = lazy(() => import('./screens/tenancies/InventoryScreen'));
const AdminScreen = lazy(() => import('./screens/admin/AdminScreen'));
const SettingsScreen = lazy(() => import('./screens/settings/SettingsScreen'));
const PricingScreen = lazy(() => import('./screens/pricing/PricingScreen'));
const PortfolioScreen = lazy(() => import('./screens/analytics/PortfolioScreen'));
const Section8Wizard = lazy(() => import('./screens/legal/Section8Wizard'));
const ServicesMarketplaceScreen = lazy(() => import('./screens/services/ServicesMarketplaceScreen'));

export const router = createBrowserRouter([
    {
        path: '/auth',
        children: [
            { path: 'login', element: <SignInScreen /> },
            // Legacy wrapper compatibility if needed
            { path: 'signin', element: <Navigate to="/auth/login" replace /> },
            { path: 'register', element: <SignUpScreen /> },
            { path: 'signup', element: <Navigate to="/auth/register" replace /> },
            { path: 'tenant-invite', element: <TenantInviteScreen /> },
        ]
    },
    {
        path: '/',
        element: (
            <RequireAuth>
                <DashboardLayout />
            </RequireAuth>
        ),
        children: [
            { index: true, element: <Suspense fallback={<LoadingScreen />}><DashboardScreen /></Suspense> },
            { path: 'dashboard', element: <Suspense fallback={<LoadingScreen />}><DashboardScreen /></Suspense> },
            { path: 'properties', element: <Suspense fallback={<LoadingScreen />}><PropertiesScreen /></Suspense> },
            { path: 'properties/new', element: <Suspense fallback={<LoadingScreen />}><NewPropertyScreen /></Suspense> },
            { path: 'properties/:id', element: <Suspense fallback={<LoadingScreen />}><PropertyDetailScreen /></Suspense> },

            // Property Sub-routes
            { path: 'properties/:id/new-tenancy', element: <Suspense fallback={<LoadingScreen />}><NewTenancyScreen /></Suspense> },
            { path: 'properties/:id/new-compliance', element: <Suspense fallback={<LoadingScreen />}><NewComplianceScreen /></Suspense> },
            { path: 'properties/:id/new-maintenance', element: <Suspense fallback={<LoadingScreen />}><NewMaintenanceScreen /></Suspense> },

            { path: 'compliance', element: <Suspense fallback={<LoadingScreen />}><ComplianceScreen /></Suspense> },
            { path: 'maintenance', element: <Suspense fallback={<LoadingScreen />}><MaintenanceScreen /></Suspense> },
            { path: 'maintenance/new', element: <Suspense fallback={<LoadingScreen />}><NewMaintenanceScreen /></Suspense> },

            { path: 'inspections', element: <Suspense fallback={<LoadingScreen />}><InspectionsScreen /></Suspense> },
            { path: 'expenses', element: <Suspense fallback={<LoadingScreen />}><ExpensesScreen /></Suspense> },
            { path: 'settings', element: <Suspense fallback={<LoadingScreen />}><SettingsScreen /></Suspense> },
            { path: 'pricing', element: <Suspense fallback={<LoadingScreen />}><PricingScreen /></Suspense> },
            { path: 'analytics', element: <Suspense fallback={<LoadingScreen />}><PortfolioScreen /></Suspense> },
            { path: 'admin', element: <Suspense fallback={<LoadingScreen />}><AdminScreen /></Suspense> },

            { path: 'legal/evictions', element: <Suspense fallback={<LoadingScreen />}><Section8Wizard /></Suspense> },
            { path: 'services', element: <Suspense fallback={<LoadingScreen />}><ServicesMarketplaceScreen /></Suspense> },

            // Tenancy specific routes
            { path: 'tenancies/:id/deposit', element: <Suspense fallback={<LoadingScreen />}><DepositProtectionScreen /></Suspense> },
            { path: 'tenancies/:id/right-to-rent', element: <Suspense fallback={<LoadingScreen />}><RightToRentScreen /></Suspense> },
            { path: 'tenancies/:id/background-check', element: <Suspense fallback={<LoadingScreen />}><TenantBackgroundCheckScreen /></Suspense> },
            { path: 'tenancies/:id/inventory', element: <Suspense fallback={<LoadingScreen />}><InventoryScreen /></Suspense> },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
]);
