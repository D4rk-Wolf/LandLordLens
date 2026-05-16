import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Sentry from '@sentry/react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.icon}>⚠️</Text>
                        <Text style={styles.title}>Something went wrong</Text>
                        <Text style={styles.message}>
                            An unexpected error occurred. We&apos;ve been notified and are working to fix it.
                        </Text>
                        {this.state.error && (
                            <View style={styles.errorBox}>
                                <Text style={styles.errorText}>
                                    {this.state.error.toString()}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleRetry}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Reload Application</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: '100%',
        minHeight: '100vh' as any, // Ensure full height on web
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 32,
        maxWidth: 500,
        width: '100%',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        elevation: 10,
    },
    icon: {
        fontSize: 48,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1f2937',
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    errorBox: {
        backgroundColor: '#fef2f2',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#fee2e2',
    },
    errorText: {
        color: '#ef4444',
        fontFamily: 'monospace',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#4f46e5',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
