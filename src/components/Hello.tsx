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
