# DNS Manager (React Native CLI)

A high-performance Android utility to toggle Private DNS (AdGuard) using native `Settings.Global` integration.

## ⚠️ Important Requirement

Because this app modifies Global System Settings, you **must** grant it `WRITE_SECURE_SETTINGS` permission after installing the APK. The app cannot grant this to itself.

1.  Connect your phone to your PC via USB (Debugging Enabled).
2.  Run the following command:

```bash
adb shell pm grant com.dnsmanager android.permission.WRITE_SECURE_SETTINGS
```

## Setup & Build

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run on Android**:
    ```bash
    npx react-native run-android
    ```

## Project Structure

- `App.tsx`: Main React Native UI.
- `android/app/src/main/java/com/dnsmanager/DNSModule.java`: Native Java module that interfaces with Android Settings.

## Credits

**Architect**: Harsh Awasthi  
**Build**: React Native CLI + Native Modules
