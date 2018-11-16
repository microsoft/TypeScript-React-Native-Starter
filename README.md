# TypeScript React Native Starter

[![Greenkeeper badge](https://badges.greenkeeper.io/Li-Victor/TypeScript-React-Native-Starter.svg)](https://greenkeeper.io/)

Up to date Typescript React Native Starter project. Based on [React Native blog post](https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native) and [repository](https://github.com/Microsoft/TypeScript-React-Native-Starter).

Android | iOS
|:--:|:--:|
<img src="https://github.com/Li-Victor/TypeScript-React-Native-Starter/blob/master/android.png"> | <img src="https://github.com/Li-Victor/TypeScript-React-Native-Starter/blob/master/ios.png">

## Prerequisites
You will need [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com), and [Yarn](https://yarnpkg.com/lang/en).

## Renaming Project

The application is called ExampleProject. If you to rename the project, use [react-native-rename](https://github.com/junedomingo/react-native-rename).

### Installation

```
yarn global add react-native-rename
or
npm install react-native-rename -g
```

Switch to new branch first
> better to have back-up

```sh
git checkout -b rename-app
```

#### Usage

```
react-native-rename <newName>
watchman watch-del-all
npm start --reset-cache
```

> With custom Bundle Identifier (Android only. For iOS, please use Xcode)
```
react-native-rename <newName> -b <bundleIdentifier>
watchman watch-del-all
npm start --reset-cache
```

#### Example

```sh
react-native-rename "Travel App"
```
> With custom Bundle Identifier
```sh
react-native-rename "Travel App" -b com.junedomingo.travelapp
watchman watch-del-all
npm start --reset-cache
```

## Testing

```sh
yarn test
```

## Helpful Resources

* [Create React Native TypeScript](https://github.com/mathieudutour/create-react-native-app-typescript) is a port of [Create React Native App](https://github.com/react-community/create-react-native-app) that uses TypeScript.
* [React Native Template TypeScript](https://github.com/emin93/react-native-template-typescript) is a clean and minimalist template for a quick start with TypeScript.
