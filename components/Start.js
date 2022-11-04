import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

// background color choices
const bgColor = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  sage: '#B9C6AE'
};

export default class Start extends Component {
  constructor(props) {
    super(props);
    // default background is set to sage
    this.state = { name: '', color: '#B9C6AE' }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background-image.png')}
          style={styles.backgroundImage}>
          <Text style={styles.title}>Chat App</Text>
          {/* input section of home screen */}
          <View nativeID="formLabel" style={styles.inputContainer}>
            <TextInput
              style={[styles.text, styles.name]}
              placeholder='Your Name'
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              accessibilityLabel="input"
              accessibilityLabelledBy="formLabel"
              accessibilityHint="Enters your name in the navigation bar"
            />
            {/* background color choice */}
            <View>
              <Text style={[styles.text, styles.bgText]}>Choose Background Color:</Text>
              <View style={styles.colors}>
                <TouchableOpacity style={[{ backgroundColor: bgColor.black }, styles.background]}
                  onPress={() => this.setState({ color: bgColor.black })}
                  accessible={true}
                  accessibilityLabel="color black"
                  accessibilityHint="Let’s you choose background color to black.">
                </TouchableOpacity>
                <TouchableOpacity style={[{ backgroundColor: bgColor.purple }, styles.background]}
                  onPress={() => this.setState({ color: bgColor.purple })}
                  accessible={true}
                  accessibilityLabel="color purple"
                  accessibilityHint="Let’s you change background color to purple.">
                </TouchableOpacity>
                <TouchableOpacity style={[{ backgroundColor: bgColor.grey }, styles.background]}
                  onPress={() => this.setState({ color: bgColor.grey })}
                  accessible={true}
                  accessibilityLabel="color grey"
                  accessibilityHint="Let’s you change background color to grey.">
                </TouchableOpacity>
                <TouchableOpacity style={[{ backgroundColor: bgColor.sage }, styles.background]}
                  onPress={() => this.setState({ color: bgColor.sage })}
                  accessible={true}
                  accessibilityLabel="color sage green"
                  accessibilityHint="Let’s you change background color to sage green.">
                </TouchableOpacity>
              </View>
            </View>
            {/* button for entering chat component */}
            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
                style={styles.button}
                accessible={true}
                accessibilityLabel="chat"
                accessibilityHint="Navigates to the chat."
                accessibilityRole="button"
              >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* this moves up the input screen but keyboard is no longer covered
          <KeyboardAvoidingView behavior="height" /> */}
        </ImageBackground>
      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingVertical: '6%',
    resizeMode: 'cover',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingVertical: '15%'
  },
  inputContainer: {
    backgroundColor: '#fff',
    width: '88%',
    height: '44%',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    paddingVertical: '6%',
  },
  // styling for user input
  name: {
    opacity: '50%',
    borderColor: 'lightgrey',
    borderRadius: 5,
    borderWidth: 2,
    height: 60,
    paddingLeft: '3%'
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083'
  },
  // set space between choose background text and color choices
  bgText: {
    paddingBottom: '2%'
  },
  // making background color choices round
  background: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'stretch',
    marginRight: '12%'
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'center'
  },
  button: {
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});
