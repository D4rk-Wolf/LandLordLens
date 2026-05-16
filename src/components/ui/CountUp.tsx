import React, { useEffect, useState } from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface CountUpProps {
    end: number;
    duration?: number;
    style?: StyleProp<TextStyle>;
    prefix?: string;
    suffix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
    end,
    duration = 1500,
    style,
    prefix = '',
    suffix = ''
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function (easeOutExpo)
            const easeOut = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

            const currentCount = Math.floor(easeOut(percentage) * end);
            setCount(currentCount);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure exact end value
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration]);

    return (
        <Text style={style}>
            {prefix}{count.toLocaleString()}{suffix}
        </Text>
    );
};
