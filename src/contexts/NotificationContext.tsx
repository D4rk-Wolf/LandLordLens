import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, PanResponder } from 'react-native';

interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title?: string;
}

interface NotificationContextType {
    showNotification: (message: string, type?: Notification['type'], title?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = useCallback((message: string, type: Notification['type'] = 'info', title?: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications(prev => [...prev, { id, message, type, title }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <View style={styles.container}>
                {notifications.map(notification => (
                    <Toast
                        key={notification.id}
                        {...notification}
                        onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                    />
                ))}
            </View>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within NotificationProvider');
    return context;
};

const Toast: React.FC<Notification & { onClose: () => void }> = ({ message, type, title, onClose }) => {
    const [opacity] = useState(() => new Animated.Value(0));
    const [translateY] = useState(() => new Animated.Value(-20));

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
    }, [opacity, translateY]);

    const handleDismiss = () => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: -10, duration: 200, useNativeDriver: true }),
        ]).start(() => onClose());
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    };

    const getColor = () => {
        switch (type) {
            case 'success': return 'var(--success)';
            case 'error': return 'var(--danger)';
            case 'warning': return 'var(--warning)';
            default: return 'var(--primary)';
        }
    };

    return (
        <Animated.View style={[
            styles.toast,
            { opacity, transform: [{ translateY }], borderLeftColor: getColor() }
        ]}>
            <View style={styles.toastContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${getColor()}15` }]}>
                    <Text style={styles.icon}>{getIcon()}</Text>
                </View>
                <View style={styles.textContainer}>
                    {title && <Text style={styles.toastTitle}>{title}</Text>}
                    <Text style={styles.toastMessage}>{message}</Text>
                </View>
                <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                    <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 24,
        right: 24,
        left: 24,
        maxWidth: 400,
        alignSelf: 'flex-end',
        zIndex: 1000,
        gap: 12,
    },
    toast: {
        backgroundColor: 'var(--glass-bg)',
        //@ts-ignore
        backdropFilter: 'blur(12px)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'var(--glass-border)',
        borderLeftWidth: 4,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 18,
    },
    textContainer: {
        flex: 1,
    },
    toastTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: 2,
    },
    toastMessage: {
        fontSize: 13,
        color: 'var(--text-secondary)',
        lineHeight: 18,
    },
    closeButton: {
        padding: 4,
    },
    closeText: {
        color: 'var(--text-tertiary)',
        fontSize: 14,
        fontWeight: '600',
    },
});
