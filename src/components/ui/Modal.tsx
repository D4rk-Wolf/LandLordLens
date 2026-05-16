import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal as RNModal, TouchableOpacity, Animated, ScrollView } from 'react-native';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: number | string;
}

export const Modal: React.FC<ModalProps> = ({
    isVisible,
    onClose,
    title,
    children,
    footer,
    width = 600
}) => {
    const [scale] = useState(() => new Animated.Value(0.95));
    const [opacity] = useState(() => new Animated.Value(0));

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.spring(scale, { toValue: 1, friction: 8, useNativeDriver: false }),
                Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: false }),
            ]).start();
        } else {
            scale.setValue(0.95);
            opacity.setValue(0);
        }
    }, [isVisible, opacity, scale]);

    return (
        <RNModal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.backdrop}
                    onPress={onClose}
                />
                <Animated.View style={[
                    styles.modalContent,
                    { width },
                    { transform: [{ scale }], opacity }
                ]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
                        {children}
                    </ScrollView>

                    {footer && (
                        <View style={styles.footer}>
                            {footer}
                        </View>
                    )}
                </Animated.View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 24,
        zIndex: 1000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContent: {
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'var(--glass-border)',
        maxHeight: '90%',
        //@ts-expect-error web-only shadow
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'var(--gray-200)',
        backgroundColor: 'var(--bg-surface)',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: 'var(--text-primary)',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'var(--gray-100)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        fontWeight: '700',
    },
    body: {
        backgroundColor: 'var(--bg-primary)',
    },
    bodyContent: {
        padding: 24,
    },
    footer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: 'var(--gray-200)',
        backgroundColor: 'var(--bg-surface)',
    },
});
