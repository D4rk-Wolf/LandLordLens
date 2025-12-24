import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: (event?: any) => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon,
    style,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[
                styles.base,
                styles[size],
                styles[variant],
                disabled && styles.disabled,
                style,
            ]}
            // @ts-ignore
            className={`btn btn-${variant}`} // Leverage CSS classes for hover states
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' || variant === 'destructive' ? '#FFF' : '#64748B'}
                />
            ) : (
                <>
                    {icon && <Text style={[styles.icon, styles[`${variant}Text`]]}>{icon}</Text>}
                    <Text style={[styles.text, styles[size], styles[`${variant}Text`]]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        gap: 8,
    } as ViewStyle,

    // Sizes
    sm: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    md: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    lg: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },

    // Variants (Fallbacks for RN, but CSS handles main styling)
    primary: {
        backgroundColor: '#6366F1', // indigo-500
    },
    secondary: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    destructive: {
        backgroundColor: '#EF4444', // red-500
    },
    disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
    } as any,

    // Text Styles
    text: {
        fontWeight: '500',
        fontFamily: 'var(--font-sans)',
    } as TextStyle,
    icon: {
        fontSize: 16,
    },

    primaryText: { color: '#FFFFFF' },
    secondaryText: { color: '#334155' }, // slate-700
    ghostText: { color: '#475569' }, // slate-600
    destructiveText: { color: '#FFFFFF' },
});
