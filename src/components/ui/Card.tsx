import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ViewStyle, StyleProp } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'interactive' | 'outlined';
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    hoverable?: boolean; // Mobile-web compatibility for hover states could be added here
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    style,
    onPress,
    hoverable = false
}) => {

    // Base container depends on whether it's interactive (TouchableOpacity) or static (View)
    const Container = onPress ? TouchableOpacity : View;

    // Combine base styles with variant-specific styles
    const combinedStyles = [
        styles.card,
        variant === 'interactive' && styles.interactive,
        variant === 'outlined' && styles.outlined,
        style
    ];

    return (
        <Container
            style={combinedStyles as any}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            {children}
        </Container>
    );
};

export const CardHeader: React.FC<{ children: React.ReactNode; style?: StyleProp<ViewStyle> }> = ({ children, style }) => (
    <View style={[styles.header, style]}>
        {children}
    </View>
);

export const CardContent: React.FC<{ children: React.ReactNode; style?: StyleProp<ViewStyle> }> = ({ children, style }) => (
    <View style={[styles.content, style]}>
        {children}
    </View>
);

export const CardFooter: React.FC<{ children: React.ReactNode; style?: StyleProp<ViewStyle> }> = ({ children, style }) => (
    <View style={[styles.footer, style]}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 12, // var(--radius-lg)
        borderWidth: 1,
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        padding: 0, // Content handles padding or use CardContent
        overflow: 'hidden',
    },
    interactive: {
        // Hover effects are typically handled by CSS in React Native Web or separate hover hooks
        // For now, we rely on the implementation site to add specific hover classes if needed
        // or just rely on the activeOpacity visual feedback.
        cursor: 'pointer',
    } as any,
    outlined: {
        backgroundColor: 'transparent',
        borderColor: 'var(--border-medium)',
    },
    header: {
        padding: 20,
        paddingBottom: 12,
    },
    content: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 20,
    },
    footer: {
        padding: 16,
        backgroundColor: 'var(--slate-50)',
        borderTopWidth: 1,
        borderTopColor: 'var(--border-subtle)',
    }
});
