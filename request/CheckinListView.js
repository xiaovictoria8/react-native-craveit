import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

// import style info
const styles = require('../styles/styles.js');

/** Class displays a happy message saying that deliverer's check in succeeded! **/
export default class CheckinListView extends Component {
  static navigationOptions = {
    title: "Check In succeeded!",
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{params.data.title}</Text>
      </View>
    );
  }
}