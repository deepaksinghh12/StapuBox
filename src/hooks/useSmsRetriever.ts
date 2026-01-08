import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';

export const useSmsRetriever = (onOtpFound: (otp: string) => void) => {
    const [hash, setHash] = useState<string[]>([]);

    useEffect(() => {
        if (Platform.OS !== 'android') return;

        // Get hash code for the backend to include in SMS (useful for debugging/testing)
        RNOtpVerify.getHash()
            .then(setHash)
            .catch(console.log);

        // Start listening for SMS
        RNOtpVerify.getOtp()
            .then((p) => RNOtpVerify.addListener(otpHandler))
            .catch((p) => console.log(p));

        return () => {
            // Clean up listener
            if (Platform.OS === 'android') {
                RNOtpVerify.removeListener();
            }
        };
    }, []);

    const otpHandler = (message: string) => {
        if (!message) return;

        // Regex to extract 4 digit code
        // Assuming message format contains "1234" or "is 1234"
        const otpMatch = /(\d{4})/g.exec(message);

        if (otpMatch && otpMatch[1]) {
            onOtpFound(otpMatch[1]);
            RNOtpVerify.removeListener(); // Stop listening once found
        }
    };

    return { hash };
};
