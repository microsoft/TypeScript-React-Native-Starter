# TypeScript React Native Starter

## 准备环境

因为你的开发环境可能是不同的操作系统平台, 一些必要的基本设置还是需要的.
首先确认在你本地开发环境中能够正常运行一个简单的 React Native app, 当然, 是在没有集成 Typescript 的状况下.
参考 [官方新手入门](https://facebook.github.io/react-native/docs/getting-started.html).
跟随教程直到你掌握了如何在真机或模拟器中运行的技巧后, 恭喜你, 可以继续集成 Typescript 至你的项目中了.

当然, 你还需要在本机安装 [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com), 以及 [Yarn](https://yarnpkg.com/lang/en).

## 初始化你的 React Native 工程

一旦你通过脚手架创建了一个常规的 React Native 项目后, 你已经准备好了开始集成 Typescript.
让我们继续做如下的操作.

```sh
react-native init MyAwesomeProject
cd MyAwesomeProject
```

## 集成 Typescript

接下来的步骤将 Typescript 集成至你已经初始化完毕的工程.
将要执行以下的操作:

- 在项目中安装 Typescript 包
- 在项目中安装 [React Native TypeScript Transformer](https://github.com/ds300/react-native-typescript-transformer) 包
- 初始化一个 Typescript 的配置, 我们将在后续的操作中修改配置.
- 新建一个空白的 React Native Typescript Transformer 配置文件, 也将会在后面修改配置.
- 安装 React 和 React Native 的声明文件包, [typings 项目地址](https://github.com/DefinitelyTyped/DefinitelyTyped).

好了, 让我们继续实操.

```sh
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
yarn add --dev @types/react @types/react-native
```

`tsconfig.json` 文件包含了所有的 Typescript 编译器所支持的编译选项.
而我们通过上面第三条命令初始化的配置项通常已经相当棒了, 但还是需要去掉下面所示行的注解:

```js
{
  ...
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
  ...
}
```

`rc-cli.config.js` 包含了 React Native TypeScript Transformer 模块的配置项.
添加以下代码:

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  }
};
```

## 代码迁移至 TypeScript

将自动生成的 `App.js` 和 `__tests__/App.js` 文件后缀名修改为 `.tsx`.
`index.js` 文件需要保持 `.js` 的后缀名.
后续的所有用户代码文件都应该使用 `.tsx` 后缀名(或者是 `.ts`, 当然是未使用任何 JSX 的文件).

如果你立马就尝试运行项目, 将会出现类似于 `object prototype may only be an object or null` 的异常.
这是因为在同一行使用了 React 模块的默认导出与具名导出.
修改 `App.tsx` 的第一行即可, 如下所示:

```diff
-import React, { Component } from 'react';
+import React from 'react'
+import { Component } from 'react';
```

后续可能再出现的某些类似问题原因都在于 Babel 和 TypeScript 对于 CommonJS 模块的不同处理方式.
在可能的将来, 两者会保持一致的行为.

妥了, 现在你应该能够正常的运行你的 React Native app 了.

## 添加 TypeScript 代码测试的基础设施

由于项目使用 [Jest](https://github.com/facebook/jest), 我们将安装 [ts-jest](https://www.npmjs.com/package/ts-jest) 至开发依赖.

```sh
yarn add --dev ts-jest
```

接下来, 修改 `package.json` 文件替换 `jest` 字段为下列值:

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
    "<rootDir>/node_modules/"
  ],
  "cacheDirectory": ".jest/cache"
}
```

上面的配置将使 Jest 运行 `.ts` 和 `.tsx` 后缀的文件时使用 `ts-jest`.

## 安装类型声明文件依赖

为了获得更好的 TypeScript 开发体验, 我们希望`类型检查器`能够明白项目中的依赖库暴露出的结构与 API 方法.
一些第三方库会在发布时通过 `.d.ts` 文件使得使用者的本地环境能够了解自身所定义的结构与方法签名等等.
但是对于另外一些库, 并未在自身的包内包含声明文件, 我们需要明确的安装 `@types/` 命名空间下对应的类型声明包.

举个栗子, 我们需要 Jest, React,  React Native, 以及 React Test Renderer 的类型声明.

```ts
yarn add --dev @types/jest @types/react @types/react-native @types/react-test-renderer
```

之所以将这些类型类型声明文件的包安装成为了 **开发依赖** 是因为并不会将此项目作为一个库发布至 npm .
如果需要, 那便需要当做常规依赖来安装.

当然, 你可以了解更多, [关于`.d.ts`](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html).

## 忽略不必要的测试文件

在工程代码的版本控制中, 你可能想要忽略 `.jest` 文件夹.
如果你使用 git, 我们只需要添加一些表达式至 `.gitignore` 文件中.

```config
# Jest
#
.jest/
```

为了规范考虑, 将你的项目文件提交至版本控制.

```sh
git init
git add .gitignore # import to do this first, to ignore our files
git add .
git commit -am "Initial commit."
```

## 新增组件

现在我们可以自由添加组件到 app 中了.

接下来让我们创建一个 `Hello.tsx` 组件.

首先, 创建一个 `components` 文件夹, 然后将下面的示例代码添加至文件中.

```ts
// components/Hello.tsx
import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"

export interface Props {
  name: string
  enthusiasmLevel?: number
  onIncrement?: () => void
  onDecrement?: () => void
}

interface State {
  enthusiasmLevel: number
}

export class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error("You could be a little more enthusiastic. :D")
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1
    }
  }

  onIncrement = () => this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 });
  onDecrement = () => this.setState({ enthusiasmLevel: this.state.enthusiasmLevel - 1 });
  getExclamationMarks = (numChars: number) => Array(numChars + 1).join("!")

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Hello {this.props.name + this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.onIncrement}
              accessibilityLabel="increment"
              color="blue"
            />
          </View>
        </View>
      </View>
    )
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
    borderWidth: 5
  },
  button: {
    flex: 1,
    paddingVertical: 0
  },
  greeting: {
    color: "#999",
    fontWeight: "bold"
  }
})
```

我滴个天呐! 内容太多了, 不过我们可以稍作分解后再来理解:

* 和 HTML 中使用的 `div`,`span`,`h1` 等等元素不同, 此处我们使用了组件 `View` 和 `Button`. 它们都是跨平台的原生 UI 组件.
* 定义样式使用了 React Native 提供给我们的函数 `StyleSheet.create`. React 中的样式表支持我们可以使用 Flexbox 布局, 并且绝大多数类似于 CSS 样式表.

## 添加组件测试

现在我们已经拥有了一个组件, 接下来让我们补充测试代码.

我们已经安装了 Jest 作为测试执行器.
我们将要为组件进行截图测试, 然而还需安装必要的扩展:

```sh
yarn add --dev react-addons-test-utils
```

接下来在 `components` 目录下创建一个 `__tests__` 文件夹, 并且针对 `Hello.tsx` 新增一个测试模块:

```ts
// components/__tests__/Hello.tsx
import React from 'react'
import renderer from 'react-test-renderer'

import { Hello } from "../Hello"

it("renders correctly with defaults", () => {
  const button = renderer.create(<Hello name="World" enthusiasmLevel={1} />).toJSON()
  expect(button).toMatchSnapshot()
})
```

这个测试案例运行后, 会将对应的组件渲染后截图存储为 `components/__tests__/__snapshots__/Hello.tsx.snap`.  

当你后续修改了组件, 需要重新运行测试案例更新截图以确认是否有无意识的疏漏.
[了解更多关于 React Native 组件测试方法.](https://facebook.github.io/jest/docs/en/tutorial-react-native.html)

## 接下来

查阅我们提供的 [React TypeScript 引导](https://github.com/Microsoft/TypeScript-React-Starter), 其中也涵盖了类似状态管理 [Redux](http://redux.js.org) 相关的主题.

另外, 如果你在寻找既支持 web 也支持 React Native, 并且完全地使用 TypeScript 编写的组件库.
[ReactXP](https://microsoft.github.io/reactxp/),了解一下?

## 其他有用的资源

* [Create React Native TypeScript](https://github.com/mathieudutour/create-react-native-app-typescript) is a port of [Create React Native App](https://github.com/react-community/create-react-native-app) that uses TypeScript.
* [React Native Template TypeScript](https://github.com/emin93/react-native-template-typescript) is a clean and minimalist template for a quick start with TypeScript.


