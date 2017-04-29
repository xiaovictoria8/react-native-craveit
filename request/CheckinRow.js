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


export default class CheckinRow extends Component {
  render({data, onPress} = this.props) {
    const { deliverer_id, from_name, to_name, expire_time, start_time } = data;
    return (
    <View style={styles.container}>
      <TouchableOpacity 
      	onPress={onPress}
      	activeOpacity={0.7}
      >
        <Text style={styles.headerText}>From: {from_name} To: {to_name}</Text>
        <Text>Expires in {Math.round((new Date(start_time + expire_time) - new Date()) / (1000 * 60))} minutes</Text>
        <Text></Text>
      </TouchableOpacity>
    </View>
    );
  }
}