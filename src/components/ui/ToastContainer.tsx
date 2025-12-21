import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToast } from '../../contexts/ToastContext';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
    const { toasts, hideToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <View style={styles.container}>
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} onDismiss={hideToast} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'fixed',
        top: 80,
        right: 24,
        zIndex: 9999,
        maxWidth: 400,
        width: '100%',
        pointerEvents: 'box-none',
        '@media (max-width: 768px)': {
            left: 24,
            right: 24,
            maxWidth: '100%',
        },
    } as any,
});

export default ToastContainer;
