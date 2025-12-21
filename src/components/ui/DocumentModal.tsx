import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';

interface DocumentModalProps {
    isVisible: boolean;
    onClose: () => void;
    documentName: string;
    documentType: string;
    children?: React.ReactNode;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
    isVisible,
    onClose,
    documentName,
    documentType,
    children
}) => {
    const scale = useRef(new Animated.Value(0.9)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.spring(scale, { toValue: 1, friction: 8, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
            ]).start();
        } else {
            scale.setValue(0.9);
            opacity.setValue(0);
        }
    }, [isVisible]);

    return (
        <Modal
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
                    { transform: [{ scale }], opacity }
                ]}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>{documentName}</Text>
                            <Text style={styles.subtitle}>{documentType}</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.body}>
                        {children ? (
                            children
                        ) : (
                            <View style={styles.previewContainer}>
                                <View style={styles.placeholderContainer}>
                                    <Text style={styles.placeholderIcon}>📄</Text>
                                    <Text style={styles.placeholderText}>Document Preview</Text>
                                    <Text style={styles.placeholderSubtext}>
                                        Viewer for {documentType} files is coming soon in the production environment.
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>

                    {!children && (
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.downloadButton}>
                                <Text style={styles.downloadButtonText}>Download File</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.printButton}>
                                <Text style={styles.printButtonText}>Print</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 24,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContent: {
        width: '100%',
        maxWidth: 800,
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'var(--glass-border)',
    },
    header: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'var(--gray-200)',
        backgroundColor: 'var(--bg-secondary)',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: 'var(--text-primary)',
    },
    subtitle: {
        fontSize: 13,
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 2,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
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
        backgroundColor: 'transparent',
    },
    previewContainer: {
        height: 500,
        backgroundColor: 'var(--gray-50)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    placeholderContainer: {
        alignItems: 'center',
        maxWidth: 300,
    },
    placeholderIcon: {
        fontSize: 64,
        marginBottom: 24,
    },
    placeholderText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: 8,
    },
    placeholderSubtext: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: 'var(--gray-200)',
        backgroundColor: 'var(--bg-secondary)',
    },
    downloadButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'var(--primary)',
    },
    downloadButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    printButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'var(--gray-200)',
    },
    printButtonText: {
        color: 'var(--text-primary)',
        fontWeight: '600',
        fontSize: 14,
    },
});
