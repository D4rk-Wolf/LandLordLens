import React from 'react';
import { View, Text, StyleSheet, DimensionValue } from 'react-native';

interface ChartProps {
    data: { label: string; value: number; color: string }[];
    title?: string;
    height?: number;
}

export const BarChart: React.FC<ChartProps> = ({ data, title, height = 200 }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={[styles.chartArea, { height }]}>
                {data.map((item, index) => (
                    <View key={index} style={styles.barContainer}>
                        <View style={styles.barWrapper}>
                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height: `${(item.value / maxValue) * 100}%` as DimensionValue,
                                        backgroundColor: item.color,
                                    }
                                ]}
                            >
                                <View style={styles.barGloss} />
                            </View>
                        </View>
                        <Text style={styles.label} numberOfLines={1}>{item.label}</Text>
                        <Text style={styles.value}>{item.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export const PieChart: React.FC<ChartProps> = ({ data, title }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    let currentAngle = 0;

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.pieContainer}>
                <svg viewBox="0 0 100 100" style={{ width: 150, height: 150, transform: 'rotate(-90deg)' }}>
                    {data.map((item, index) => {
                        const percentage = total > 0 ? (item.value / total) * 100 : 0;
                        const x1 = 50 + 50 * Math.cos((currentAngle * Math.PI) / 180);
                        const y1 = 50 + 50 * Math.sin((currentAngle * Math.PI) / 180);
                        currentAngle += (percentage / 100) * 360;
                        const x2 = 50 + 50 * Math.cos((currentAngle * Math.PI) / 180);
                        const y2 = 50 + 50 * Math.sin((currentAngle * Math.PI) / 180);
                        const largeArc = percentage > 50 ? 1 : 0;

                        if (percentage === 0) return null;

                        return (
                            <path
                                key={index}
                                d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                fill={item.color}
                            />
                        );
                    })}
                    <circle cx="50" cy="50" r="30" fill="white" />
                </svg>
                <View style={styles.legend}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                            <Text style={styles.legendLabel}>{item.label}: {item.value}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: 'var(--glass-bg)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'var(--glass-border)',
        //@ts-ignore
        backdropFilter: 'blur(16px)',
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: 24,
    },
    chartArea: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        paddingTop: 20,
    },
    barContainer: {
        alignItems: 'center',
        flex: 1,
        gap: 8,
    },
    barWrapper: {
        height: '100%',
        width: 32,
        backgroundColor: 'var(--gray-100)',
        borderRadius: 16,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    bar: {
        width: '100%',
        borderRadius: 16,
        position: 'relative',
    },
    barGloss: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    label: {
        fontSize: 11,
        color: 'var(--text-tertiary)',
        fontWeight: '600',
        marginTop: 4,
    },
    value: {
        fontSize: 13,
        fontWeight: '700',
        color: 'var(--text-primary)',
    },
    pieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
    },
    legend: {
        flex: 1,
        gap: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 4,
    },
    legendLabel: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        fontWeight: '500',
    },
});
