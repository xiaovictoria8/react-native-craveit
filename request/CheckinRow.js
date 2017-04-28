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
    const {title, rating, image } = data;
    return (
    <View style={styles.container}>
      <TouchableOpacity 
      	onPress={onPress}
      	activeOpacity={0.7}
      >
        <Text style={styles.headerText}>{title}</Text>
        <Text>{rating}</Text>
        <Text></Text>
      </TouchableOpacity>
    </View>
    );
  }
}