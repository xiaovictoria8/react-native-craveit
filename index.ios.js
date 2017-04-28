/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

// set up delivery check-in form
var Form = t.form.Form;

// define the check-in form
var CheckinForm = t.struct({
  "Current Location": t.String,  
  "Where to?": t.String, 
  "For how long? (in minutes)": t.Number,           
});

var options = {}; // optional rendering options (see documentation)

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

// import style info
const styles = require('./styles/styles.js');

export default class craveit extends Component {
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

AppRegistry.registerComponent('craveit', () => craveit);
