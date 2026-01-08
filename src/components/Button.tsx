import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export const Button = ({ title, onPress, isLoading, disabled, style }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                disabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
        >
            {isLoading ? (
                <ActivityIndicator color={COLORS.text} />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        height: SIZES.inputHeight,
        borderRadius: SIZES.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    disabled: {
        backgroundColor: COLORS.surface,
        opacity: 0.7,
    },
    text: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FONTS.medium,
    },
});
