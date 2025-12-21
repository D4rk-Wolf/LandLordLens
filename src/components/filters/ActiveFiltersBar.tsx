import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FilterConfig, ActiveFilters } from '../../hooks/useFilters';

interface FilterChipProps {
    label: string;
    value: string;
    onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, value, onRemove }) => {
    return (
        <View style={styles.chip}>
            <Text style={styles.chipLabel}>{label}:</Text>
            <Text style={styles.chipValue}>{value}</Text>
            <TouchableOpacity onPress={onRemove} style={styles.chipRemove}>
                <Text style={styles.chipRemoveIcon}>✕</Text>
            </TouchableOpacity>
        </View>
    );
};

interface ActiveFiltersBarProps {
    activeFilters: ActiveFilters;
    filterConfig: FilterConfig;
    onClearFilter: (key: string) => void;
    onClearAll: () => void;
}

const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
    activeFilters,
    filterConfig,
    onClearFilter,
    onClearAll,
}) => {
    const filterEntries = Object.entries(activeFilters);

    if (filterEntries.length === 0) return null;

    const formatValue = (key: string, value: any): string => {
        const config = filterConfig[key];
        if (!config) return String(value);

        switch (config.type) {
            case 'multiselect':
                return Array.isArray(value) ? value.join(', ') : String(value);
            case 'range':
                return `${value.min || '∞'} - ${value.max || '∞'}`;
            case 'date':
                return `${value.start || ''} to ${value.end || ''}`;
            case 'boolean':
                return value ? 'Yes' : 'No';
            default:
                return String(value);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Active Filters ({filterEntries.length})</Text>
                <TouchableOpacity onPress={onClearAll} style={styles.clearAllButton}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                {filterEntries.map(([key, value]) => (
                    <FilterChip
                        key={key}
                        label={filterConfig[key]?.label || key}
                        value={formatValue(key, value)}
                        onRemove={() => onClearFilter(key)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        //@ts-ignore
        backdropFilter: 'blur(12px)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'var(--gray-200)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: 'var(--text-primary)',
    },
    clearAllButton: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: 8,
    },
    clearAllText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'var(--danger)',
    },
    chipsContainer: {
        flexDirection: 'row',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'var(--primary)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        gap: 6,
    },
    chipLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.9)',
    },
    chipValue: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff',
    },
    chipRemove: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    chipRemoveIcon: {
        fontSize: 10,
        color: '#fff',
        fontWeight: '700',
    },
});

export default ActiveFiltersBar;
