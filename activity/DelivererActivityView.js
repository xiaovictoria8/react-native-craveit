import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

// import style info
const styles = require('../styles/styles.js');

/** Class displays a happy message saying that deliverer's check in succeeded! **/
export default class DelivererActivityView extends Component {
  static navigationOptions = {
    title: "Check In succeeded!",
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>You have sent a Request</Text>
        <Text>1. You'll updates when the deliverer accepts your request</Text>
        <Text>2. Chat with the deliverer to discuss changes or details</Text>
        <Text>3. Enjoy your delivery!</Text>
      </View>
    );
  }
}