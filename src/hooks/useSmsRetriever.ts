import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const useSmsRetriever = (onOtpFound: (otp: string) => void) => {
    const [hash, setHash] = useState<string[]>([]);

    useEffect(() => {
        if (Platform.OS !== 'android') return;

        let RNOtpVerify: any;
        try {
            // Dynamic require to prevent crash in Expo Go which doesn't have this native module
            RNOtpVerify = require('react-native-otp-verify').default;

            if (!RNOtpVerify) {
                console.warn('Native module "react-native-otp-verify" not loaded.');
                return;
            }
        } catch (error) {
            console.warn('Native module "react-native-otp-verify" not found. SMS Auto-read is disabled in Expo Go.');
            return;
        }

        RNOtpVerify.getHash()
            .then(setHash)
            .catch((e: any) => console.log('Hash error', e));

        RNOtpVerify.getOtp()
            .then((p: any) => RNOtpVerify.addListener(otpHandler))
            .catch((p: any) => console.log('OTP listener error', p));

        return () => {
            if (Platform.OS === 'android') {
                try {
                    if (RNOtpVerify) {
                        RNOtpVerify.removeListener();
                    }
                } catch (e) { }
            }
        };
    }, []);

    const otpHandler = (message: string) => {
        if (!message) return;

        // Regex to extract 4 digit code
        const otpMatch = /(\d{4})/g.exec(message);

        if (otpMatch && otpMatch[1]) {
            onOtpFound(otpMatch[1]);
            try {
                // Safe require for handler as well
                const RNOtpVerify = require('react-native-otp-verify').default;
                if (RNOtpVerify) RNOtpVerify.removeListener();
            } catch (e) { }
        }
    };

    return { hash };
};
