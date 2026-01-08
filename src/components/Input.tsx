import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export const Input = ({ label, error, containerStyle, style, ...props }: InputProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    error ? styles.inputError : null,
                    style,
                ]}
                placeholderTextColor={COLORS.textSecondary}
                selectionColor={COLORS.primary}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        color: COLORS.text,
        marginBottom: 8,
        fontSize: 14,
        fontFamily: FONTS.medium,
    },
    input: {
        backgroundColor: COLORS.surface,
        height: SIZES.inputHeight,
        borderRadius: SIZES.borderRadius,
        paddingHorizontal: 16,
        color: COLORS.text,
        fontSize: 16,
        fontFamily: FONTS.regular,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: 4,
    },
});
