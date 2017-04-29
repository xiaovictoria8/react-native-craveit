import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

// import style info
const styles = require('../styles/styles.js');

/** Class displays a happy message saying that deliverer's check in succeeded! **/
export default class RequestDetail extends Component {
  static navigationOptions = {
    title: "Request Details",
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
      <Text style={styles.headerText}>From: {params.data.from_name}</Text>
      <Text style={styles.headerText}>To: {params.data.to_name}{"\n"}</Text>

      <Text>Order Details: </Text>
      <Text>{params.data.order_desc}{"\n"}</Text>

      <Text>Request time: </Text>
      <Text>{new Date(params.data.request_time).toString()}</Text>
      <Text></Text>
      <Text></Text>
      </View>
    );
  }
}