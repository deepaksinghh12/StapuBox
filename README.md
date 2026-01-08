# StapuBox - OTP Login Flow

Hi Team! 👋

This is my submission for the **StapuBox Full-Stack Intern** role. I've built the requested 3-screen OTP login flow using **React Native (Expo)** and **TypeScript**.

I tried to replicate the Figma design as closely as possible (Dark Mode) and implemented the bonus features like SMS Auto-reading and countdown timers.

## 📱 Features Implemented
- **Screen 1 (Login)**: Validates the 10-digit mobile number and hits the API.
- **Screen 2 (Verify)**:
  - 4-digit OTP input (Auto-focuses on the next box!).
  - **Auto-Submit**: As soon as you type the 4th digit, it verifies.
  - **Timer**: A 60-second cooldown before you can click "Resend".
  - **SMS Auto-Read**: I used `react-native-otp-verify` to listen for SMS on Android.
- **Screen 3 (Details)**: A clean form to enter user details once logged in.

## 🛠️ Tech Stack
- **React Native (Expo SDK 52)** - *Because it's fast to set up and easy to run.*
- **TypeScript** - *For type safety (and cleaner code!).*
- **Axios** - *For handling the API requests.*
- **React Navigation** - *For smooth screen transitions.*

## 🚀 How to Run locally

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/deepaksinghh12/StapuBox.git
    cd StapuBox
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the app:**
    ```bash
    npx expo start
    ```
    *Scan the QR code with the Expo Go app on your phone!*

## 📝 Notes & Assumptions
- **SMS Hash Issue**: For the Auto-read to work perfectly without clicking "Allow", the SMS usually needs a specific hash string at the end. Since the backend sends a standard OTP message, the app might ask for permission or I had to use a workaround.
- **Dark Mode**: I loved the dark theme in the Figma file, so I hardcoded the colors in `src/theme/index.ts` to match it exactly.

Hope you like it! Looking forward to your feedback. 🚀

-- Deepak