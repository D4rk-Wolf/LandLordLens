import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface BreadcrumbItem {
    label: string;
    onPress?: () => void;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    if (items.length === 0) return null;

    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <View key={index} style={styles.breadcrumbWrapper}>
                    {index > 0 && <Text style={styles.separator}>/</Text>}
                    {item.onPress ? (
                        <TouchableOpacity onPress={item.onPress} activeOpacity={0.7}>
                            <Text style={styles.breadcrumbLink}>{item.label}</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.breadcrumbCurrent}>{item.label}</Text>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    breadcrumbWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        fontSize: 14,
        color: 'var(--text-tertiary)',
        marginHorizontal: 8,
    },
    breadcrumbLink: {
        fontSize: 14,
        fontWeight: '500',
        color: 'var(--primary)',
        //@ts-ignore
        transition: 'opacity 0.2s ease',
    },
    breadcrumbCurrent: {
        fontSize: 14,
        fontWeight: '600',
        color: 'var(--text-primary)',
    },
});

export default Breadcrumbs;
