import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface BulkActionBarProps {
    selectedCount: number;
    onSelectAll?: () => void;
    onClearSelection: () => void;
    onDelete?: () => void;
    onExport?: () => void;
    actions?: Array<{
        label: string;
        icon: string;
        onPress: () => void;
        variant?: 'primary' | 'danger' | 'secondary';
    }>;
}

const BulkActionBar: React.FC<BulkActionBarProps> = ({
    selectedCount,
    onSelectAll,
    onClearSelection,
    onDelete,
    onExport,
    actions = [],
}) => {
    if (selectedCount === 0) return null;

    const defaultActions = [
        ...(onSelectAll ? [{
            label: 'Select All',
            icon: '☑',
            onPress: onSelectAll,
            variant: 'secondary' as const,
        }] : []),
        ...(onExport ? [{
            label: 'Export',
            icon: '📤',
            onPress: onExport,
            variant: 'primary' as const,
        }] : []),
        ...(onDelete ? [{
            label: 'Delete',
            icon: '🗑',
            onPress: onDelete,
            variant: 'danger' as const,
        }] : []),
        ...actions,
    ];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.leftSection}>
                    <Text style={styles.count}>{selectedCount} selected</Text>
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={onClearSelection}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.clearText}>Clear</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.actionsSection}>
                    {defaultActions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.actionButton,
                                action.variant === 'danger' && styles.actionButtonDanger,
                                action.variant === 'primary' && styles.actionButtonPrimary,
                            ]}
                            onPress={action.onPress}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.actionIcon}>{action.icon}</Text>
                            <Text
                                style={[
                                    styles.actionLabel,
                                    action.variant === 'danger' && styles.actionLabelDanger,
                                    action.variant === 'primary' && styles.actionLabelPrimary,
                                ]}
                            >
                                {action.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'var(--primary)',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginBottom: 16,
        //@ts-ignore
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    count: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
    clearButton: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 8,
    },
    clearText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
    },
    actionsSection: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 10,
        //@ts-ignore
        transition: 'all 0.2s ease',
    },
    actionButtonPrimary: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    actionButtonDanger: {
        backgroundColor: 'rgba(239, 68, 68, 0.3)',
    },
    actionIcon: {
        fontSize: 14,
    },
    actionLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
    },
    actionLabelPrimary: {
        color: '#fff',
    },
    actionLabelDanger: {
        color: '#fff',
    },
});

export default BulkActionBar;
