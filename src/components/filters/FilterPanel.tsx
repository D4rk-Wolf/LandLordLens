import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { FilterConfig, FilterOption } from '../../hooks/useFilters';

interface FilterPanelProps {
    isVisible: boolean;
    onClose: () => void;
    filterConfig: FilterConfig;
    activeFilters: Record<string, any>;
    onApplyFilters: (filters: Record<string, any>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    isVisible,
    onClose,
    filterConfig,
    activeFilters,
    onApplyFilters,
}) => {
    const [localFilters, setLocalFilters] = useState(activeFilters);

    const handleApply = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const handleReset = () => {
        setLocalFilters({});
    };

    const renderFilterControl = (key: string, config: typeof filterConfig[string]) => {
        const value = localFilters[key];

        switch (config.type) {
            case 'select':
                return (
                    <View style={styles.filterSection}>
                        <Text style={styles.filterLabel}>{config.label}</Text>
                        <View style={styles.optionsGrid}>
                            {config.options?.map((option) => (
                                <TouchableOpacity
                                    key={String(option.value)}
                                    style={[
                                        styles.optionButton,
                                        value === option.value && styles.optionButtonActive,
                                    ]}
                                    onPress={() => setLocalFilters(prev => ({ ...prev, [key]: option.value }))}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            value === option.value && styles.optionTextActive,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );

            case 'multiselect':
                const selectedValues = Array.isArray(value) ? value : [];
                return (
                    <View style={styles.filterSection}>
                        <Text style={styles.filterLabel}>{config.label}</Text>
                        <View style={styles.optionsGrid}>
                            {config.options?.map((option) => {
                                const isSelected = selectedValues.includes(option.value);
                                return (
                                    <TouchableOpacity
                                        key={String(option.value)}
                                        style={[
                                            styles.optionButton,
                                            isSelected && styles.optionButtonActive,
                                        ]}
                                        onPress={() => {
                                            const newValues = isSelected
                                                ? selectedValues.filter(v => v !== option.value)
                                                : [...selectedValues, option.value];
                                            setLocalFilters(prev => ({ ...prev, [key]: newValues }));
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                isSelected && styles.optionTextActive,
                                            ]}
                                        >
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                );

            case 'range':
                const rangeValue = value || {};
                return (
                    <View style={styles.filterSection}>
                        <Text style={styles.filterLabel}>{config.label}</Text>
                        <View style={styles.rangeInputs}>
                            <TextInput
                                style={styles.rangeInput}
                                placeholder={`Min (${config.min || 0})`}
                                keyboardType="numeric"
                                value={rangeValue.min?.toString() || ''}
                                onChangeText={(text) => {
                                    const num = parseFloat(text);
                                    setLocalFilters(prev => ({
                                        ...prev,
                                        [key]: { ...rangeValue, min: isNaN(num) ? undefined : num },
                                    }));
                                }}
                            />
                            <Text style={styles.rangeSeparator}>-</Text>
                            <TextInput
                                style={styles.rangeInput}
                                placeholder={`Max (${config.max || '∞'})`}
                                keyboardType="numeric"
                                value={rangeValue.max?.toString() || ''}
                                onChangeText={(text) => {
                                    const num = parseFloat(text);
                                    setLocalFilters(prev => ({
                                        ...prev,
                                        [key]: { ...rangeValue, max: isNaN(num) ? undefined : num },
                                    }));
                                }}
                            />
                        </View>
                    </View>
                );

            case 'boolean':
                return (
                    <View style={styles.filterSection}>
                        <TouchableOpacity
                            style={styles.booleanToggle}
                            onPress={() => setLocalFilters(prev => ({ ...prev, [key]: !value }))}
                        >
                            <View style={[styles.checkbox, value && styles.checkboxActive]}>
                                {value && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                            <Text style={styles.filterLabel}>{config.label}</Text>
                        </TouchableOpacity>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.panel}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Filters</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {Object.entries(filterConfig).map(([key, config]) => (
                            <View key={key}>
                                {renderFilterControl(key, config)}
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                            <Text style={styles.resetText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    panel: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '80%',
        //@ts-ignore
        boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.15)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'var(--gray-200)',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
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
        fontSize: 18,
        color: 'var(--text-secondary)',
    },
    content: {
        padding: 24,
    },
    filterSection: {
        marginBottom: 32,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: 12,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: 'var(--gray-100)',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    optionButtonActive: {
        backgroundColor: 'var(--primary)',
        borderColor: 'var(--primary)',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'var(--text-secondary)',
    },
    optionTextActive: {
        color: '#fff',
    },
    rangeInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    rangeInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'var(--gray-100)',
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: 'var(--text-primary)',
        borderWidth: 1,
        borderColor: 'var(--gray-200)',
    },
    rangeSeparator: {
        fontSize: 16,
        fontWeight: '700',
        color: 'var(--text-secondary)',
    },
    booleanToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'var(--gray-300)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: 'var(--primary)',
        borderColor: 'var(--primary)',
    },
    checkmark: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: 'var(--gray-200)',
    },
    resetButton: {
        flex: 1,
        paddingVertical: 14,
        backgroundColor: 'var(--gray-100)',
        borderRadius: 12,
        alignItems: 'center',
    },
    resetText: {
        fontSize: 15,
        fontWeight: '700',
        color: 'var(--text-primary)',
    },
    applyButton: {
        flex: 2,
        paddingVertical: 14,
        backgroundColor: 'var(--primary)',
        borderRadius: 12,
        alignItems: 'center',
    },
    applyText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
});

export default FilterPanel;
