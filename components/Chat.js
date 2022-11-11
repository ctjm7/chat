import React, { Component } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
const firebase = require('firebase');
require('firebase/firestore');
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      isConnected: false,
      image: null,
    };

     // Firebase configuration
    if(!firebase.apps.length) {
      firebase.initializeApp(
        {
          apiKey: "AIzaSyANztBDqg0ahQuceGdZyBsPN2ncnk00WjI",
          authDomain: "chatapp-d05d1.firebaseapp.com",
          projectId: "chatapp-d05d1",
          storageBucket: "chatapp-d05d1.appspot.com",
          messagingSenderId: "223966456572",
          appId: "1:223966456572:web:b1233a684500fc24668579",
        });
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    // sets the input name from Start into navigation at top
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: `${name}'s Chat` });

    // checks if user is connected to the internet
    NetInfo.fetch().then(connection => {
      // when online authenticate via Firebase and loads messages from Firebase
      if (connection.isConnected) {
        this.setState({
          isConnected: true
        });
        this.referenceChatMessages = firebase.firestore().collection('messages');
        if (this.referenceChatMessages !== (null || undefined)) {
          this.unsubscribe = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);
        }

        // listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
        this.setState({
          uid: user.uid,
          messages: [],
          user: {
            _id: user.uid,
            name: name,
          }
        });
        this.unsubscribe = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);
        });
        // offline loads locally saved messages
      } else {
        this.setState({
          isConnected: false
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    if (this.isConnected) {
      // stop listening for changes
      this.unsubscribe();
      // stop listening to authentication
      this.authUnsubscribe();
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      });
    } catch (error) {
    console.log(error.message);
    }
  }

  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      // the text needs to include empty field option to render images
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  };

  // updates new message to state of messages object for display
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
        this.saveMessages();
      });
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

  // renders message input if online or hides it if offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar {...props} />
       );
      }
  };

  // displays the communication features
  renderCustomActions = (props) => {
   return <CustomActions {...props} />;
  };

  //custom map view
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    // this set state from Start for background color selection and name
    const { color, name } = this.props.route.params;

    return (
      <ActionSheetProvider>
      <View style={[styles.container, { backgroundColor: color }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          renderCustomView={this.renderCustomView.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{ _id: this.state.user._id, name: name }}
        />

        {/* moves the keyboard from hiding input field on Android */}
        {Platform.OS === 'android' ?
          <KeyboardAvoidingView behavior="height" /> : null}
        </View>
      </ActionSheetProvider>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
