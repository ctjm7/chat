# Chat App

<img
  src="./screenshot-home.png"
  alt="Chat App Home"
  style="display: inline-block; margin: 0 auto; width: 500px; height: auto;">

  <img
  src="./screenshot-chat.png"
  alt="Chat App Chat Screen"
  style="display: block; margin: 0 auto; width: 500px; height: auto;">

## Description
This is a mobile app built using React Native. The app provides users with a chat interface and options to share images and their location.

## Purpose of the App
This app was developed to understand the use of React Native in mobile app development, which allows the app to be used on iOS and Android devices. The app also utilizes Google Firestone to store the chat messages. It alows the user to choose background color, share location with location services and access camera for uploading images.

## Key Features
* page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images and location data.
* Data gets stored online and offline.

## User Stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Tech used
  CSS, JavaScript, Expo, React Native, Gifted Chat, Google Firebase and Firestore

## Setting up your environment

1. Clone repository: git clone https://github.com/ctjm7/chat.git
2. Install Expo CLI as a global npm package: `npm install --global expo-cli`
3. Create an account with expo: https://expo.dev/signup
4. Create a new expo project: `expo init [project name]`
5. Install all Project dependencies inside the project folder: `npm install`
6. Start the Project: `npm start` or `expo start`
7. Use an emulator (ex: Android Studio) for viewing the application or download Expo Go on your mobile device
8. Setup a database with [Google Firebase](https://firebase.google.com). You will login to your google account and then click on the console. You will setup a database with the necessary fields provided by Gifted Chat.

## Dependencies
```"@expo/react-native-action-sheet": "^4.0.1"
"@react-native-async-storage/async-storage": "~1.17.3"
"@react-native-community/masked-view": "^0.1.11"
"@react-native-community/netinfo": "9.3.0"
"@react-navigation/native": "^6.0.13"
"@react-navigation/stack": "^6.3.3"
"expo": "~46.0.16"
"expo-image-picker": "~13.3.1"
"expo-location": "~14.3.0"
"expo-permissions": "~13.2.0"
"expo-status-bar": "~1.4.0"
"firebase": "^7.9.0"
"react": "18.0.0"
"react-native": "0.69.6",
"react-native-gesture-handler": "~2.5.0"
"react-native-gifted-chat": "^1.0.4"
"react-native-maps": "0.31.1"
"react-native-reanimated": "~2.9.1"
"react-native-safe-area-context": "4.3.1"
"react-native-screens": "~3.15.0"
"react-navigation": "^4.4.4"```
