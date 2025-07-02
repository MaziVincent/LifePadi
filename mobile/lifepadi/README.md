# Lifepadi

LifePadi is your trusted logistics companion that revolutionizes the way you handle deliveries in Nigeria. Whether you're a business owner or an individual, our app provides a reliable, secure, and efficient solution for all your delivery needs.

Key Features:
• Real-time Package Tracking: Monitor your deliveries every step of the way
• Instant Price Quotes: Get transparent pricing before booking
• Secure Payments: Multiple payment options with bank-grade security
• Door-to-Door Service: Convenient pickup and delivery to your preferred location
• Live Chat Support: Get assistance whenever you need it
• Business Integration: Special features for different businesses including e-commerce, restaurants, and more.

Download LifePadi today and experience logistics made simple!

## Deep Linking

LifePadi supports deep linking to directly navigate to specific screens within the app using custom URI schemes and universal links.

### Supported Deep Link Formats

- Custom URI scheme: `lifepadi://app/{route}`
- Fragment-based: `lifepadi://app/#{route}`
- Universal links (iOS): `https://app.lifepadi.com/{route}`
- App links (Android): `https://app.lifepadi.com/{route}`

### Example Deep Links

```
lifepadi://app/profile         // Opens the profile screen
lifepadi://app/wallet          // Opens the wallet screen
lifepadi://app/orders          // Opens the orders list screen
lifepadi://app/orders/123      // Opens a specific order
lifepadi://app/products/456    // Opens a specific product
lifepadi://app/logistics       // Opens the logistics screen
lifepadi://app/errands         // Opens the errands screen
lifepadi://app/settings        // Opens settings screen

// Fragment-based examples
lifepadi://app/#/profile       // Opens the profile screen
lifepadi://app/#/wallet        // Opens the wallet screen

// Web URLs (requires proper setup of Universal Links/App Links)
https://app.lifepadi.com/profile   // Opens the profile screen
```

### Testing Deep Links

#### Android

**Using Terminal**

```bash
# Using adb to test deep links on emulator or connected device
adb shell am start -a android.intent.action.VIEW -d "lifepadi://app/profile"
adb shell am start -a android.intent.action.VIEW -d "lifepadi://app/logistics"
adb shell am start -a android.intent.action.VIEW -d "https://app.lifepadi.com/orders"
```

**On Physical Device**

1. Send a message containing the deep link URL to yourself (WhatsApp, SMS, etc.)
2. Tap on the link to open the app
3. You can also type the URL in any browser on your device

#### iOS

**Using Terminal (Simulator)**

```bash
# Open deep links on iOS simulator
xcrun simctl openurl booted "lifepadi://app/profile"
xcrun simctl openurl booted "lifepadi://app/logistics"
xcrun simctl openurl booted "https://app.lifepadi.com/orders"
```

**On Physical Device**

2. **Notes App Method** - Type the deep link in a note and tap on it: `lifepadi://app/profile`

3. **Safari Method** - Type the deep link directly in Safari's address bar: `lifepadi://app/wallet`

4. **Message Method** - Send yourself a message with the deep link and tap on it.

### Deep Links Setup for Production

For production deployment, the following is required:

1. **Android App Links**:

   - Create an `assetlinks.json` file at `https://app.lifepadi.com/.well-known/assetlinks.json`
   - The file should contain the app's package name and SHA-256 certificate fingerprints

2. **iOS Universal Links**:
   - Create an `apple-app-site-association` file at `https://app.lifepadi.com/.well-known/apple-app-site-association`
   - Add the Associated Domains capability to the identity in your Apple Developer account (Certificates, Identifiers & Profiles).
   - Add the Associated Domains capability to your Xcode project

### Build an Android app bundle for deployment

```bash
flutter build appbundle
```

### Build an iOS archive for deployment

```bash
flutter build ipa \
  --release \
  --obfuscate \
  --split-debug-info=build/app/outputs/symbols
```
