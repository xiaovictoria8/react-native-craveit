import React, { Component } from 'react';
import {
  Image,              // Renders background image
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Handles row presses
  View                // Container component
} from 'react-native';
import Dimensions from 'Dimensions';

// Detect screen size to calculate row height
const screen = Dimensions.get('window');
// import style info
const styles = require('../styles/styles.js');


export default class RequestRow extends Component {
  render({data, onPress} = this.props) {
    const { order_desc, request_time, requester_id, to_name, from_name } = data;
    return (
    <View style={styles.row}>
      <TouchableOpacity 
      	onPress={onPress}
      	activeOpacity={0.7}
      >
        <Text style={styles.headerText}>From: {from_name} To: {to_name}</Text>
        <Text>{order_desc}</Text>
        <Text>Requested {Math.round((new Date() - new Date(request_time)) / (1000 * 60))} minutes ago</Text>
        <Text></Text>
      </TouchableOpacity>
    </View>
    );
  }
}