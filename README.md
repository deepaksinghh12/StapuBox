# StapuBox Internship Assignment - OTP Login Flow

This is a React Native (Expo) application implementing a 3-screen OTP login flow as per the assignment requirements.

## Features
- **Send OTP**: Validates 10-digit mobile number and triggers API.
- **Verify OTP**: 4-digit input with auto-focus, auto-submit, and countdown timer.
- **SMS Auto-Read**: Automatically detects and Fills OTP from SMS (Android only).
- **Dark Mode UI**: Professional dark theme styled to match the provided Figma design.
- **Details Screen**: A placeholder third screen for user details.

## Tech Stack
- **Framework**: React Native (Expo SDK 52)
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack)
- **Networking**: Axios
- **SMS Handling**: `react-native-otp-verify`

## Prerequisites
- Node.js (v18+)
- Android Studio / Android Device (for testing APK / SMS feature)

## Setup & Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npx expo start
   ```
   - Press `a` to open in Android Emulator.
   - Scan QR code with Expo Go on your phone.

## Building APK
To generate a standalone APK:

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```
2. **Configure Build**
   ```bash
   eas build:configure
   ```
3. **Build for Android**
   ```bash
   eas build -p android --profile preview
   ```

## Design Decisions
- **Theming**: A central `theme/index.ts` file manages colors and fonts to ensure consistency with the Dark Mode requirement.
- **SMS Retriever**: Implemented via `react-native-otp-verify`. This library listens for the SMS broadcast on Android. Note: For Zero-Tap auto-fill to work perfectly, the SMS body typically needs to include the App Hash string. If the backend doesn't send this hash, the listener might require user permission (One-Tap).
- **Navigation**: Used `replace` instead of `navigate` after successful verification to prevent the user from going back to the OTP screen.

## Project Structure
```
src/
  ├── api/           # Axios client & endpoints
  ├── components/    # Reusable UI (Button, Input)
  ├── constants/     # Config (API URL, Token)
  ├── hooks/         # Custom hooks (useSmsRetriever)
  ├── screens/       # Login, Verify, Details
  ├── theme/         # Colors, Fonts, Metrics
  └── utils/         # Helpers
```

## Known Issues/Assumptions
- **SMS Hash**: The backend SMS template is assumed to be standard. If auto-read doesn't trigger, it's likely because the SMS content doesn't match the specific hash requirements of the Android SMS Retriever API.
- **Font**: Used System default font san-serif as exact font file wasn't provided.
