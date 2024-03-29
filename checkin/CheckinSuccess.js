import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

// import style info
const styles = require('../styles/styles.js');

/** Class displays a happy message saying that deliverer's check in succeeded! **/
export default class CheckinSuccess extends Component {
  static navigationOptions = {
    title: "Check In succeeded!",
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>You have checked in</Text>
        <Text>1. You'll receive updates when someone sends you a request.</Text>
        <Text>2. Chat with the request to decide whether to accept</Text>
      </View>
    );
  }
}