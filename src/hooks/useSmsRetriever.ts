export const useSmsRetriever = (onOtpFound: (otp: string) => void) => {
    // SMS Retriever is strictly disabled for Expo Go usage.
    // It requires a custom Native Build to work because 'react-native-otp-verify' is a native library.
    // To enable this in production/APK:
    // 1. Uncomment the native code below
    // 2. Build using 'eas build' or 'npx expo run:android'

    /*
    import { useEffect, useState } from 'react';
    import { Platform } from 'react-native';
    import RNOtpVerify from 'react-native-otp-verify';
  
    const [hash, setHash] = useState<string[]>([]);
  
    useEffect(() => {
      if (Platform.OS === 'android') {
        RNOtpVerify.getHash()
          .then(setHash)
          .catch(console.log);
  
        RNOtpVerify.getOtp()
          .then(p => RNOtpVerify.addListener(otpHandler))
          .catch(p => console.log(p));
  
        return () => RNOtpVerify.removeListener();
      }
    }, []);
  
    const otpHandler = (message: string) => {
      const otpMatch = /(\d{4})/g.exec(message);
      if (otpMatch && otpMatch[1]) {
        onOtpFound(otpMatch[1]);
        RNOtpVerify.removeListener();
      }
    };
    return { hash };
    */

    // Mock return for development
    return { hash: ['#MOCK_HASH'] };
};
