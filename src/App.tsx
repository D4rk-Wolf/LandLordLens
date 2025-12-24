import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ToastProvider } from './contexts/ToastContext';
import ToastContainer from './components/ui/ToastContainer';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="saas-loading-container">
        <div className="saas-background-decoration">
          <div className="saas-decorative-circle saas-circle-1" />
          <div className="saas-decorative-circle saas-circle-2" />
        </div>
        <div className="animate-enter">
          <div className="saas-loading-content">
            <div className="saas-logo-container">
              <span className="saas-logo-icon">🏠</span>
            </div>
            <ActivityIndicator size="large" color="var(--primary)" />
            <div className="saas-loading-text">LandLordLens</div>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

const App: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <NotificationProvider>
            <AuthProvider>
              <AppContent />
              <ToastContainer />
            </AuthProvider>
          </NotificationProvider>
        </ToastProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
};

export default App;
