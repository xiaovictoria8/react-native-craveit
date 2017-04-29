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
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';

// import other pages of the app
import CraverHub from './request/CraverHub';
import CheckinsActivityListView from './activity/CheckinsActivityListView';
import CheckinListView from './request/CheckinListView';

import RequestSuccess from './request/RequestSuccess';
import CheckinSuccess from './checkin/CheckinSuccess';

// import style info
const styles = require('./styles/styles.js');

// initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKnG_JYCOB-Zgz2jT4ATJkQ_C0mjLP52g",
  authDomain: "craveit-28f41.firebaseapp.com",
  databaseURL: "https://craveit-28f41.firebaseio.com",
  projectId: "craveit-28f41",
  storageBucket: "craveit-28f41.appspot.com",
  messagingSenderId: "1186416101"
};

global.firebaseApp = firebase.initializeApp(firebaseConfig, "craveit");
global.userKey = "-Kis8QdjuS7lnqrbhVn6";

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
var navIcon = require("./chats-icon.png");

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

      var newRef = firebaseApp.database().ref("checkins").push({
        "deliverer_id": global.userKey,
        "start_time": new Date().getTime(), // time stored in milliseconds
        "expire_time": value[HOW_LONG] * 60 * 1000, // time stored in milliseconds
        "from_name": value[CUR_LOCATION],
        "from_coordinates": 0,
        "to_name": value[WHERE_TO],
        "to_coordinates": 0
      });

      firebaseApp.database().ref("users/" + global.userKey + "/checkins").push({
        "checkinKey": newRef.key,
      });

      const { navigate } = this.props.navigation;
      navigate('CheckinSuccess');
    }
  }

  render() {
    return (
      <View style={styles.container}>
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

const MainTabNavigator = TabNavigator({
  "Craver Hub": {screen: CraverHub},
  "Activity": {screen: CheckinsActivityListView},
  "Check In": { screen: CheckinFormView },
});

const craveit = StackNavigator({
  Home: { screen: MainTabNavigator },
  CheckinSuccess: {screen: CheckinSuccess },
  CheckinListView: {screen: CheckinListView },
  RequestSuccess: {screen: RequestSuccess },
});


AppRegistry.registerComponent('craveit', () => craveit);
