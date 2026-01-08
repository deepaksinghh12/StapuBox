import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SIZES, FONTS } from '../theme';
import { Button } from '../components/Button';
import { verifyOtp, resendOtp, sendOtp } from '../api/client';
import { useSmsRetriever } from '../hooks/useSmsRetriever';

type RootStackParamList = {
    Login: undefined;
    Verify: { mobile: string };
    Details: undefined;
};

type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>;
type VerifyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Verify'>;

export default function VerifyScreen() {
    const navigation = useNavigation<VerifyScreenNavigationProp>();
    const route = useRoute<VerifyScreenRouteProp>();
    const { mobile } = route.params;

    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [errorHighlight, setErrorHighlight] = useState(false);

    // Refs for auto-focusing inputs
    const inputRefs = useRef<Array<TextInput | null>>([]);

    // Auto-read SMS (Android)
    const { hash } = useSmsRetriever((extractedOtp) => {
        // Fill the OTP state
        const otpArray = extractedOtp.split('').slice(0, 4);
        if (otpArray.length === 4) {
            setOtp(otpArray);
            handleVerify(extractedOtp);
        }
    });

    // Timer countdown
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setErrorHighlight(false);

        // Logic: When user types a number, move to the next box automatically
        // This was a bit tricky to get right with the refs!
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        // If it's the last digit, submit automatically (Enhances UX)
        if (index === 3 && value) {
            // Wait slightly for state update then submit
            // Using the local variable 'newOtp' to check completeness
            if (newOtp.every(d => d !== '')) {
                handleVerify(newOtp.join(''));
            }
        }
    };

    const handleBackspace = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    const handleVerify = async (code: string) => {
        setLoading(true);
        try {
            await verifyOtp(mobile, code);
            navigation.replace('Details');
        } catch (err: any) {
            setErrorHighlight(true);
            Alert.alert('Verification Failed', err.response?.data?.message || 'Invalid OTP');
            // Reset OTP on fail? Optional. keeping it for now.
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer > 0) return;
        setLoading(true);
        try {
            await resendOtp(mobile); // Or sendOtp(mobile) depending on API, doc says resendOtp
            setTimer(60);
            Alert.alert('Sent', 'OTP has been resent to your mobile number.');
        } catch (err: any) {
            Alert.alert('Error', 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Phone Verification</Text>
                <Text style={styles.subtitle}>Enter 4-digit OTP sent to +91 {mobile}</Text>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => { inputRefs.current[index] = ref; }}
                            style={[
                                styles.otpInput,
                                errorHighlight && styles.otpInputError,
                                digit ? styles.otpInputFilled : null
                            ]}
                            value={digit}
                            onChangeText={(val) => handleOtpChange(val, index)}
                            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                            selectionColor={COLORS.primary}
                        />
                    ))}
                </View>

                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>Didn't receive code? </Text>
                    <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                        <Text style={[styles.resendLink, timer > 0 && styles.resendDisabled]}>
                            {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="Verify"
                    onPress={() => handleVerify(otp.join(''))}
                    isLoading={loading}
                    disabled={otp.some(d => !d)}
                    style={styles.verifyButton}
                />
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
        maxWidth: 400,
        alignSelf: 'center',
        width: '100%',
    },
    backButton: {
        marginBottom: 20
    },
    backButtonText: {
        color: COLORS.text,
        fontSize: 16
    },
    title: {
        fontSize: 24,
        color: COLORS.text,
        fontFamily: FONTS.bold,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 32,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    otpInput: {
        width: 60,
        height: 60,
        borderRadius: SIZES.borderRadius,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: FONTS.bold,
    },
    otpInputFilled: {
        borderColor: COLORS.primary,
        backgroundColor: '#2F80ED20' // Slight tint
    },
    otpInputError: {
        borderColor: COLORS.error,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24
    },
    resendText: {
        color: COLORS.textSecondary
    },
    resendLink: {
        color: COLORS.primary,
        fontWeight: '600'
    },
    resendDisabled: {
        color: COLORS.textSecondary,
        opacity: 0.7
    },
    verifyButton: {
        marginTop: 'auto',
        marginBottom: 20
    }
});
