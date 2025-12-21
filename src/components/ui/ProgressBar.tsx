import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ProgressBarProps {
    progress: number; // 0-100
    color?: string;
    height?: number;
    showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = 'var(--primary)',
    height = 8,
    showPercentage = false,
}) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <View style={styles.container}>
            <View style={[styles.track, { height }]}>
                <View
                    style={[
                        styles.fill,
                        {
                            width: `${clampedProgress}%`,
                            backgroundColor: color,
                            height,
                        },
                    ]}
                />
            </View>
            {showPercentage && (
                <View style={styles.percentageContainer}>
                    <View style={styles.percentageBadge}>
                        <View style={styles.percentageText}>{Math.round(clampedProgress)}%</View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    track: {
        width: '100%',
        backgroundColor: 'var(--gray-200)',
        borderRadius: 999,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: 999,
        //@ts-ignore
        transition: 'width 0.3s ease',
    },
    percentageContainer: {
        position: 'absolute',
        top: -8,
        right: 0,
    },
    percentageBadge: {
        backgroundColor: 'var(--primary)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    percentageText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#fff',
    } as any,
});

export default ProgressBar;
