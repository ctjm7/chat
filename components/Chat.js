import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = { messages: [] }
  }
  componentDidMount() {
    let name = this.props.route.params.name;
    // sets the input name from Start into navigation at top
    this.props.navigation.setOptions({ title: name });
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hi, this is ${name}`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        // this is a system message
        {
          _id: 2,
          text: `${name} has entered the chat`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }
  // updates new message to state of messages object for display
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // this changes the background color of the message bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#4773ba'
          },
          left: {
            backgroundColor: '#db7bc0'
          }
        }}
      />
    )
  }

  render() {

    // this set state from Start for background color selection and name
    const { color, name } = this.props.route.params;

    return (
      <View style={[styles.container, {backgroundColor: color} ]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />

        {/* moves the keyboard from hiding input field on Android */}
        {Platform.OS === 'android' ?
          <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
