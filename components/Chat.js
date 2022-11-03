import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends Component {
    componentDidMount(){
      let name = this.props.route.params.name;

      this.props.navigation.setOptions({ title: name });
    }


  render() {
    let color = this.props.route.params.color;
    return (
      <View style={[styles.container, {backgroundColor: color} ]}>

      </View>
        );
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
