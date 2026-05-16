import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Toast as ToastType } from '../../contexts/ToastContext';

interface ToastProps {
    toast: ToastType;
    onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(-100));

    useEffect(() => {
        // Entrance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleDismiss = () => {
        // Exit animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -100,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onDismiss(toast.id);
        });
    };

    const getToastStyles = () => {
        switch (toast.type) {
            case 'success':
                return {
                    backgroundColor: 'hsl(142, 71%, 45%)',
                    icon: '✓',
                };
            case 'error':
                return {
                    backgroundColor: 'hsl(0, 84%, 60%)',
                    icon: '✕',
                };
            case 'warning':
                return {
                    backgroundColor: 'hsl(38, 92%, 50%)',
                    icon: '⚠',
                };
            case 'info':
                return {
                    backgroundColor: 'hsl(220, 90%, 56%)',
                    icon: 'ℹ',
                };
            default:
                return {
                    backgroundColor: 'hsl(220, 90%, 56%)',
                    icon: 'ℹ',
                };
        }
    };

    const toastStyle = getToastStyles();

    return (
        <Animated.View
            style={[
                styles.toast,
                { backgroundColor: toastStyle.backgroundColor },
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <View style={styles.toastContent}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{toastStyle.icon}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>
                    {toast.message}
                </Text>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleDismiss}
                    activeOpacity={0.7}
                >
                    <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        marginBottom: 12,
        borderRadius: 12,
        minHeight: 60,

        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        elevation: 8,
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 12,
    },
    iconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
    },
    message: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 20,
    },
    closeButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
    },
});

export default Toast;
