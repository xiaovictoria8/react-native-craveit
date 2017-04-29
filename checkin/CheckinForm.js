import React, { Component } from 'react';
import t from 'tcomb-form-native';
import * as firebase from "firebase";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';

// import style info
const styles = require('../styles/styles.js');

// set up delivery check-in form
var Form = t.form.Form;

// define the check-in form
var CUR_LOCATION = "Current Location";
var WHERE_TO = "Where to?";
var HOW_LONG = "For how long? (in minutes)";

var basicForm = {}
basicForm[CUR_LOCATION] = t.String;
basicForm[WHERE_TO] = t.String;
basicForm[HOW_LONG] = t.Number;

var checkinForm = t.struct(basicForm);

var options = {}; // optional rendering options

// icon for navigation bar
var navIcon = require("../chats-icon.png");

/** check-in form page **/
export default class CheckinFormView extends Component {

  static navigationOptions = {
    title: 'Check In',
    tabBarLabel: 'Check In',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={navIcon}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) { 
      console.log(value);

      var newRef = global.firebaseApp.database().ref("checkins").push({
        "deliverer_id": global.userKey,
        "start_time": new Date().getTime(), // time stored in milliseconds
        "expire_time": value[HOW_LONG] * 60 * 1000, // time stored in milliseconds
        "from_name": value[CUR_LOCATION],
        "from_coordinates": 0,
        "to_name": value[WHERE_TO],
        "to_coordinates": 0
      });

      global.firebaseApp.database().ref("users/" + global.userKey + "/checkins").push({
        "checkin_key": newRef.key,
      });

      const { navigate } = this.props.navigation;
      navigate('CheckinSuccess');
    }
  }

  render() {
    return (
      <View style={styles.form}>
        <Form
          ref="form"
          type={checkinForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Broadcast</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
