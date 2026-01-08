import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SIZES, FONTS } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { sendOtp } from '../api/client';

type RootStackParamList = {
    Login: undefined;
    Verify: { mobile: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOtp = async () => {
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }
        setError('');
        setLoading(true);

        try {
            await sendOtp(mobile);
            navigation.navigate('Verify', { mobile });
        } catch (err: any) {
            Alert.alert('Error', err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Login to Your Account</Text>

                <Input
                    label="Mobile Number"
                    placeholder="Enter 10-digit number"
                    value={mobile}
                    onChangeText={(text) => {
                        setMobile(text.replace(/[^0-9]/g, ''));
                        if (error) setError('');
                    }}
                    keyboardType="number-pad"
                    maxLength={10}
                    error={error}
                    autoFocus
                />

                <Button
                    title="Send OTP"
                    onPress={handleSendOtp}
                    isLoading={loading}
                    disabled={mobile.length !== 10}
                    style={styles.button}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't look at screen 1? </Text>
                    <Text style={styles.linkText}>Create Account</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: SIZES.padding,
        justifyContent: 'center',
        maxWidth: 400,
        alignSelf: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        color: COLORS.text,
        fontFamily: FONTS.bold,
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
    },
    footer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    linkText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});
