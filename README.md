# CamRoulette-APP

# Installation

See [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) to install requirement tools.
[React-Native-Vector-Icons Installation](https://github.com/oblador/react-native-vector-icons)
[React-Native-WebRTC iOS Installation](https://github.com/oney/react-native-webrtc/blob/master/Documentation/iOSInstallation.md)
[iOS Device Achitecture Compatibility Chart](https://developer.apple.com/library/ios/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html)
[FBSDK](https://developers.facebook.com/docs/ios/downloads)
[Google AdMob Framework](https://github.com/sbugert/react-native-admob)


```bash
$ npm install -g react-native-cli
$ npm install
```

### Development

##### Start local server

```bash
$ npm run dev
```

##### iOS

Run command to open iOS simulator and run app:

```bash
$ npm run ios
```

Or open `ios/RNBoilerplate.xcodeproj` file with XCode:

```bash
$ npm run ios-open
```

##### Android (5.0+)

Open Android emulator (recommented [Genymotion](https://www.genymotion.com)) and run command: (Or connect real device via USB)

```bash
$ adb reverse tcp:8097 tcp:8097  # if you're using react-devtools
$ npm run android
```

## DevTools

In development mode, you can install [React Native Debugger](https://github.com/jhen0409/react-native-debugger) as default debugger. If not installed, it will use [Remote Redux DevTools](https://github.com/zalmoxisus/remote-redux-devtools) and [On Debugger](https://github.com/jhen0409/remote-redux-devtools-on-debugger).