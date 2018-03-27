import * as React from "react"
import { Button, StyleSheet, Text, View } from "react-native"

export interface Props {
  name: string
  enthusiasmLevel?: number
  onIncrement?: () => void
  onDecrement?: () => void
}

interface State {
  enthusiasmLevel: number
  onIncrement: () => void
  onDecrement: () => void
}

export class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error("You could be a little more enthusiastic. :D")
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
      onIncrement: props.onIncrement || (() => {}),
      onDecrement: props.onDecrement || (() => {})
    }
  }

  getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join("!")
  }

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
              onPress={this.state.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.state.onIncrement}
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
