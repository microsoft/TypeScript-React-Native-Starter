﻿# TypeScript React Native Starter

# Tools used for this Readme:
- tsc 2.7.2
- node 9.8.0
- npm 5.7.1
- yarn 1.5.1
- see package.json in this repository for the versions of the npm packages used.

As new versions of these tools are released please feel free to submit pull requests to update this README and repository.  Your assistance will be greatly appreciated.

# Prerequisites

Because you might be on one of several different platforms, targeting several different types of devices, other setup will be involved.  You should first ensure that you can run a plain React Native app without TypeScript. Follow [the instructions on the React Native website to get started](https://facebook.github.io/react-native/docs/getting-started.html). When you've managed to deploy to a device or emulator following their instructions, you'll be ready to start a TypeScript React Native app.

### Notes

Where we use npm, you can use the equivalent [Yarn](https://yarnpkg.com/lang/en/) command in its place. The output of the npm commands may contain numerous warnings that you should be able to safely ignore.

# Initializing

Let's start by initializing our new project with the `react-native` command. 
Note that this may take a few minutes.

```
react-native init MyAwesomeProject
```

#### Original directory structure

```
MyAwesomeProject.
│   App.js
│   index.js
│   package.json
│   yarn.lock
|   ...
│
├─── ...
├───android
|
├───ios
|
└───__tests__
        App.js
```

## Re-organizing the layout

Before converting files to Typescript we are going to move them to new locations and validate the application still executes.  After which we will come back and change them to TypeScript.

Create a 'src' directory were we will store our typescript files.

```sh
mkdir src
```
The React Native Packager runs `.js` files through Babel and bundles the output.  There is no easy way to configure the packager to run directly on `.ts`/`.tsx` files, but given TypeScript's emit speed, it's very reasonable to have React Native pick up TypeScript's output. 

React Native looks for the entry-point `index.js`. Move this file to `src/index.js`.

```
mv index.js src
```

Create a replacement `index.js` where React Native is expecting the entry point, and have it `import` our entry point in `src`.

```js
// index.js

import './src/index';
```
React Native initialization creates the top component App.js.
Move this file into `src/App.js`.

```sh
mv App.js src
```

Move the `__tests__` directory into `src`.

```sh
mv ./__tests__/ ./src/__tests__/
```

#### Updated directory structure

```
MyAwesomeProject.
│   index.js
│   package.json
│   yarn.lock
|   ...
|
├───android
|
├───ios
|
├───src
|   |   App.js
|   |   index.js
|   |
|   └───__tests__
|           App.js
```

To ensure that everything is working correctly, try to deploy to a device or emulator with one of the two commands:

```sh
react-native run-android
react-native run-ios
```

Ensure your tests are still passing.

```sh
npm test
```

If all is still working, it would be a good idea to commit the changes to a version control system before we introduce TypeScript.

# Adding TypeScript

First, rewrite the root `index.js` files to import from `lib` instead of `src`. As `lib` will contin the compiled `tsc` output.

```ts
// index.js

import './lib/index';
```

### Adding the TypeScript configuration file

Create a `tsconfig.json` that outputs to `lib` with the following command:

```ts
tsc --init --pretty --sourceMap --target es2015 --outDir ./lib --module commonjs --jsx react
```

Update the following in the `tsconfig.json`:

```json
{
    "compilerOptions": {
        // other options here
         "types": ["react","react-native","jest"],
         "allowSyntheticDefaultImports": true, 
         "esModuleInterop": true
    },
    "include": ["./src/"]
}
```
### Add TypeScript npm package

To be able to compile TypeScript we will need to add the `typescript` npm packge

```sh
npm install --save-dev typescript
```

### Adding TypeScript Testing Infrastructure

To be able to use TypeScript in our jest tests, we'll want to add [ts-jest](https://www.npmjs.com/package/ts-jest) to our devDependencies.

```sh
npm install --save-dev ts-jest
```

### Update jest configuration to support TypeScript

Open `package.json` and replace the `jest` field with the following:

```json
"jest": {
    "preset": "react-native",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    "transform": {
        "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
        "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "testPathIgnorePatterns": [
        "\\.snap$",
        "<rootDir>/node_modules/",
        "<rootDir>/lib/"
    ],
    "cacheDirectory": ".jest/cache"
}
```

This will configure Jest to run `.ts` and `.tsx` files with `ts-jest`.

### Install 3rd party type declarations

To get the best experience in TypeScript, we want to include the type definitions of our dependencies. Some libraries will publish their packages with `.d.ts` type declaration files which describe the types of the underlying JavaScript. For other libraries, we'll need to explicitly install the appropriate package in the `@types/` npm scope. For example, here we'll need types for Jest, React Native, and React Test Renderer.

```ts
npm install --save-dev @types/jest @types/react-native @types/react-test-renderer
```

**More about [getting `.d.ts` files](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html).**

### Moving files over to TypeScript

Now we'll move our `.js` files to `.ts` and `.tsx` files.
Rename `src/index.js` to `src/index.ts` and rename `src/App.js` to `src/App.tsx`.

TypeScript has added some improvements to module importing. Yet some [issues](https://github.com/Microsoft/TypeScript/issues/21621) still remain.  

To address the above issue do the following:

#### Module Fix
replace 

```ts
import React, {Component} from 'react';
```

with 

```ts
import React from 'react';
const {Component} = React;
```

Some of this has to do with differences in how Babel, WebPack, node and TypeScript interoperate with CommonJS modules.  In the future, hopefuilly this will stabilize on the same behavior.


Next, we'll move our tests over to TypeScript as well.
Change the extension of all files in `src/__tests__/` from `.js` to `.tsx.

Do the [Module Fix](#Module-fix) for these files also.

Run the TypeScript compiler:

```sh
./node_modules/.bin/tsc
```

Make sure the tests pass and the app still runs on an emulator/device. If so you're all set to start building out with TypeScript!

### Update `.gitignore`

For your source control, you'll want to start ignoring the `.jest` and `lib` folders.
If you're using git, we can just add entries to our `.gitignore` file.

```config
# TypeScript
#
lib/

# Jest
#
.jest/
```

As a checkpoint, consider committing your files into version control.

# Create Hello component

We can now add a component to our app.
Let's go ahead and create a `Hello.tsx` component.

```ts
// src/components/Hello.tsx
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Props {
  name: string;
}

interface State {
  date: Date;
}

export class Hello extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { date: new Date() };
  }
  private updateDate = () => {
    this.setState({
      date: new Date()
    })
  };

  render() {
    const { name, } = this.props;

    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Hello {name + '!'}
        </Text>
        <Text style={styles.greeting}>
          Current Time: {this.state.date.toLocaleString()}
        </Text>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="Update Time" onPress={this.updateDate} accessibilityLabel="decrement" color='red' />
          </View>
        </View>
      </View>
    );
  }
}

// styles

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center"
  },
  buttons: {
    flexDirection: "row",
    minHeight: 70,
    alignItems: "stretch",
    alignSelf: "center",
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: "#999",
    fontWeight: "bold"
  }
});
```

That's a lot, but let's break it down:

* Instead of rendering HTML elements like `div`, `span`, `h1`, etc., we're rendering components like `View` and `Button`.
  These are native components that work across different platforms.
* Styling is specified using the `StyleSheet.create` function that React Native gives us. Here we include the styles in the same file for simplicity sake but in practice one may consider a seperate file for the styles to simplify the code review process.
  React's StyleSheets allow us to control our layout using Flexbox, and style using other constructs similar to those in CSS stylesheets.

## Adding a component test

Now that we've got a component, let's try testing it out.

We already have Jest installed as a test runner.

Add Enzyme, a test library for React and React Native components, npm package and the adaptor.

```sh
npm install --save-dev enzyme @types/enzyme enzyme-adapter-react-16 react-dom @types/enzyme-adapter-react-16
```

#### Note
Currently we are using the adaptor for the web site as there isn't an adaptor yet for React Native.  The test case here will pass but you may see warnings. See [github issue](https://github.com/airbnb/enzyme/issues/1436) for updates.

Now let's create a `__tests__` folder in `src/components` and add a test for `Hello.tsx`:

```ts
// src/components/__tests__/Hello.tsx

import React from 'react';
import { Text } from 'react-native';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Hello } from '../Hello';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
    const hello = shallow(<Hello name="World" />);
    expect(hello.find(Text).first().render().text()).toEqual("Hello World!");
})
```

excute the tests and confirm they pass before adding the component to your App.

## Add Hello component to the App.

Replace the default render code in App.tsx with the following to use the new `Hello` component.

```ts

export default class App extends Component<Props> {
  render() {
    return (
      <Hello name="World"/>
    );
  }
}

```
execute the app and confirm all is working.  If so, check-in your changes.

# Next Steps

[Debugging the application] (https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)

Check out [our React tutorial](https://github.com/DanielRosenwasser/React-TypeScript-Tutorial) where we also cover topics like state management with [Redux](http://redux.js.org).
These same subjects can be applied when writing React Native apps.

Additionally, you may want to look at the [ReactXP](https://microsoft.github.io/reactxp/) if you're looking for a component library written entirely in TypeScript that supports both React on the web as well as React Native.
