import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ToastProvider } from './contexts/ToastContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastContainer from './components/ui/ToastContainer';
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary';
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * APP ENTRY POINT
 * This is the root component of the React application.
 * It wraps the entire app in various "Providers" to share global state:
 * - ErrorBoundary: Catches crashes to prevent white screen of death.
 * - QueryClient: Manages server state (caching, fetching) via React Query.
 * - AuthProvider: Manages user login state (user object, isAuthenticated).
 * - ThemeProvider: Manages UI theme (Light/Dark mode).
 * - Toast/Notification: Global feedback UI.
 * - RouterProvider: Handles navigation URL routing.
 */

const App: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              <NotificationProvider>
                {/* The actual pages are rendered here based on the URL */}
                <RouterProvider router={router} />
                <ToastContainer />
              </NotificationProvider>
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
};

export default App;
