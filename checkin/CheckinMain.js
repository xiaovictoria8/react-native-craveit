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
  Dimensions
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';

// import style info
const styles = require('../styles/styles.js');

// initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKnG_JYCOB-Zgz2jT4ATJkQ_C0mjLP52g",
  authDomain: "craveit-28f41.firebaseapp.com",
  databaseURL: "https://craveit-28f41.firebaseio.com",
  projectId: "craveit-28f41",
  storageBucket: "craveit-28f41.appspot.com",
  messagingSenderId: "1186416101"
};

const firebaseApp = firebase.initializeApp(firebaseConfig, "craveit");

// set up delivery check-in form
var Form = t.form.Form;

// define the check-in form
var CheckinForm = t.struct({
  "Current Location": t.String,  
  "Where to?": t.String, 
  "For how long? (in minutes)": t.Number,           
});

var options = {}; // optional rendering options (see documentation)

export default class CheckinMain extends Component {
  static navigationOptions = {
    title: 'Check in',
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.itemsRef = firebaseApp.database().ref();
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) { 
      console.log(value);

      this.itemsRef.push({
        "deliverer_id": 0,
        "start_time": new Date().getTime() / 1000, // time stored in seconds
        "expire_time": value[HOW_LONG] * 60, // time stored in seconds
        "from_name": value[CUR_LOCATION],
        "from_coordinates": 0,
        "to_name": value[WHERE_TO],
        "to_coordinates": 0
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={CheckinForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Broadcast</Text>
        </TouchableHighlight>
      </View>
    );
  }

}