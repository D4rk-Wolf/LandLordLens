import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface PageTransitionProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    delay?: number;
}

/**
 * PageTransition
 * Wraps content in a standardized fade-in/slide-up animation.
 * Uses the global CSS animations defined in src/styles/index.css.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
    children,
    style,
    delay = 0
}) => {
    return (
        <div
            className="page-transition"
            style={{
                animation: `slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms backwards`,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <View style={[styles.container, style]}>
                {children}
            </View>
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
});
