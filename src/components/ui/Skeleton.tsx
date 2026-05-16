import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, DimensionValue } from 'react-native';

interface SkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    borderRadius = 8,
    style
}) => {
    const [opacity] = useState(() => new Animated.Value(0.3));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                { width, height, borderRadius, opacity },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: 'var(--gray-200)',
    },
});
