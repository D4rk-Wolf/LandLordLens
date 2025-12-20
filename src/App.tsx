import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.backgroundDecoration}>
          <View style={[styles.decorativeCircle, styles.circle1]} />
          <View style={[styles.decorativeCircle, styles.circle2]} />
        </View>
        <View style={styles.loadingContent}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🏠</Text>
          </View>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <AppContent />
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: '100vh',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.06,
  },
  circle1: {
    width: 400,
    height: 400,
    backgroundColor: '#6366f1',
    top: -150,
    right: -150,
  },
  circle2: {
    width: 350,
    height: 350,
    backgroundColor: '#8b5cf6',
    bottom: -120,
    left: -120,
  },
  loadingContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 3,
    borderColor: '#e0e7ff',
    boxShadow: '0px 8px 16px 0px rgba(99, 102, 241, 0.2)',
    elevation: 4,
  },
  logoIcon: {
    fontSize: 48,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 17,
    color: '#6b7280',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default App;
