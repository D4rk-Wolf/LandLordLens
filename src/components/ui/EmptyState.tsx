import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    secondaryActionLabel,
    onSecondaryAction,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            {(actionLabel || secondaryActionLabel) && (
                <View style={styles.actionsContainer}>
                    {actionLabel && onAction && (
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={onAction}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.primaryButtonText}>{actionLabel}</Text>
                        </TouchableOpacity>
                    )}
                    {secondaryActionLabel && onSecondaryAction && (
                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={onSecondaryAction}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.secondaryButtonText}>{secondaryActionLabel}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
        paddingHorizontal: 32,
    },
    iconContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: 'var(--gray-100)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    icon: {
        fontSize: 48,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        color: 'var(--text-secondary)',
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 400,
        marginBottom: 32,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    primaryButton: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        backgroundColor: 'var(--primary)',
        borderRadius: 12,
        //@ts-ignore
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    primaryButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    secondaryButton: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        backgroundColor: 'transparent',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'var(--gray-300)',
    },
    secondaryButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'var(--text-primary)',
    },
});

export default EmptyState;
