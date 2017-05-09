# TypeScript React Native Starter

# Prerequisites

Because you might be on one of several different platforms, targeting several different types of devices, basic setup can be involved.
You should first ensure that you can run a plain React Native app without TypeScript.
Follow [the instructions on the React Native website to get started](https://facebook.github.io/react-native/docs/getting-started.html).
When you've managed to deploy to a device or emulator, you'll be ready to start a TypeScript React Native app.

You will also need Node and npm.
Where we use npm, we encourage you to try using [Yarn](https://yarnpkg.com/lang/en/) in its place.

# Initializing

Once you've tried scaffolding out an ordinary React Native project, you'll be ready to start adding TypeScript.
Let's go ahead and do that.

```sh
react-native init MyAwesomeProject
```

Before you do this, it might help to have Yarn or npm 5+ installed.
You'll probably want to get a cup of coffee in general, and get two if you're using npm 4 and earlier.

## Re-organizing the layout

Currently the way that React Native operates is that the React Native Packager runs `.js` files through Babel and bundles the output for the device.
At the moment, there is no easy way to configure the packager to run directly on `.tsx` files, but given TypeScript's emit speed, it's very reasonable to have React Native pick up TypeScript's output.

React Native looks for entry-points like the top-level `index.ios.js` and `index.android.js`.
We'd like to re-author these in TS, so first we'll move these files into `src/index.ios.js` and `src/index.android.js`.

```sh
mkdir src
mv index.*.js src
```

Then we'll create two replacement files to reach into the true entry-points:

```ts
// index.ios.js

import './src/index.ios';
```

```ts
// index.android.js

import './src/index.android';
```

We'll also move our `__tests__` directory into `src` as well.

```sh
mv ./__tests__/ ./src/__tests__/
```

Ensure that everything is working correctly.
Try to deploy to a device with one of the two commands:

```sh
react-native run-android
react-native run-ios
```

And ensure your tests are still passing.

```sh
npm test
```

If all is still working, it'd be a good idea to commit our changes in some version control system like git before we introduce TypeScript.

## Introducing TypeScript

It's time to introduce TypeScript to our project.
First, rewrite the root `index.ios.js` and `index.android.js` files to import from `lib` insead of `src`.

```ts
// index.ios.js

import './lib/index.ios';
```

```ts
// index.android.js

import './lib/index.android';
```


### Adding a configuration file

Let's create a `tsconfig.json`:

```ts
tsc --init --pretty --sourceMap --target es2015 --outDir ./lib --module commonjs --jsx react
```

We'll also need to add `./src/` to the `"include"` section of our `tsconfig.json`:

```json
{
    "compilerOptions": {
        // other options here
    },
    "include": ["./src/"]
}
```

### Adding TypeScript Testing Infrastructure

Since we're using Jest, we'll want to add [ts-jest](https://www.npmjs.com/package/ts-jest) and TypeScript itself to our devDependencies.

```sh
npm install --save-dev ts-jest typescript
```

Then, we'll open up our `package.json` and replace the `jest` field with the following:

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

### Installing 3rd party type declarations

To get the best experience in TypeScript, we want the type-checker to understand the shape and API of our dependencies.
Some libraries will publish their packages with `.d.ts` files (type declaration/type definition files) which can describe the shape of the underlying JavaScript.
For other libraries, we'll need to explicitly install the appropriate package in the `@types/` npm scope.
For example, here we'll need types for Jest, React, React Native, and React Test Renderer.
This turns out to require a pretty simple command.

```ts
npm install --save-dev @types/jest @types/react @types/react-native @types/react-test-renderer
```

We saved these declaration file packages to our dev dependencies because we're not publishing this package as a library to npm.
If we were, we might have to rethink some of them, but for a simple React Native app we don't have to worry about that.

To read more about [getting `.d.ts` files, you can read up more here about the process](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html).

### Moving files over to TypeScript

Now we'll move our `.js` files to `.tsx` files.
Let's take `src/index.android.js` or `src/index.ios.js` and rename them both to `src/index.android.tsx` and `src/index.ios.tsx` respectively.

We'll immediately get a few errors, but they're easy enough to fix.
The changes will include:

- Replace `import React, {Component} from 'react';` with `import * as React from 'react';`
- Replace old references to `Component` to `React.Component<object, object>`.

That should fix things right up.
Some of this has to do with differences in how Babel and TypeScript interoperate with CommonJS modules.
In the future, the two will stabilize on the same behavior.

Next, we'll move our tests over to TypeScript as well.
Just change the extension of all files in `src/__tests__/` from `.js` to `.tsx` and apply the following fixes:

- Replace `import React, {Component} from 'react';` with `import * as React from 'react';`
- Replace `import renderer from 'react-test-renderer';` with `import * as renderer from 'react-test-renderer';`
- Rewrite imports from `import Index from '../index.ios.js';` to `import Index from '../index.ios';`, and likewise for Android.
  In other words, drop the `.js` extension from your imports.

First, run TypeScript on our source:

```sh
./node_modules/.bin/tsc
```

Now we can make sure our tests still run and that the app can still correctly deploy.
If running on an emulator/device still works, and tests are still passing, you're all set to start building out with TypeScript!
As a checkpoint, consider committing your files into version control.

### Ignoring more files

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

## Adding a component

We can now add a component to our app.
Let's go ahead and create a `Hello.tsx` component.

```ts
// src/components/Hello.tsx
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <View style={styles.root}>
        <Text style={styles.greeting}>
        Hello {name + getExclamationMarks(enthusiasmLevel)}
        </Text>
        <View style={styles.buttons}>
            <View style={styles.button}>
            <Button title="-" onPress={onDecrement || (() => {})} accessibilityLabel="decrement" color='red' />
            </View>
            <View style={styles.button}>
                <Button title="+" onPress={onIncrement || (() => {})}  accessibilityLabel="increment" color='blue' />
            </View>
        </View>
    </View>
  );
}

export default Hello;

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

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
```

Woah!
That's a lot, but let's break it down:

* Instead of rendering HTML elements like `div`, `span`, `h1`, etc., we're rendering components like `View` and `Button`.
  These are native components that work across different platforms.
* Styling is specified using the `StyleSheet.create` function that React Native gives us.
  React's StyleSheets allow us to control our layout using Flexbox, and style using other constructs similar to those in CSS stylesheets.

## Adding a component test

Now that we've got a component, let's try testing it out.

We already have Jest installed as a test runner.
What we'll add in is Enzyme, a test library for React and React Native components.

Let's add in Enzyme.

```sh
npm install --save-dev enzyme @types/enzyme react-addons-test-utils react-dom
```

Now let's create a `__tests__` folder in `src/components` and add a test for `Hello.tsx`:

```ts
// src/components/__tests__/Hello.tsx

import * as React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import Hello from '../Hello';

it('renders correctly with defaults', () => {
    const hello = shallow(<Hello name="World" />);
    expect(hello.find(Text).render().text()).toEqual("Hello World!");
})
```

# Next Steps

Check out [our React tutorial](https://github.com/DanielRosenwasser/React-TypeScript-Tutorial) where we also cover topics like state management with [Redux](http://redux.js.org).
These same subjects can be applied when writing React Native apps.

Additionally, you may want to look at the [ReactXP](https://microsoft.github.io/reactxp/) if you're looking for a component library written entirely in TypeScript that supports both React on the web as well as React Native.
