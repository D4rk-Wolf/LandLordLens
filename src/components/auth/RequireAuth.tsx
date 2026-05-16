import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="var(--primary)" />
            </View>
        );
    }

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience.
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});
