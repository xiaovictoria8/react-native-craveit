import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

// import style info
const styles = require('../styles/styles.js');

// set up login and register forms
var Form = t.form.Form;

// define the check-in form
var EMAIL = "Email";
var PASSWORD = "Password";
var NAME = "Name";

var basicForm = {}
basicForm[EMAIL] = t.String;
basicForm[PASSWORD] = t.String;
basicForm[NAME] = t.maybe(t.String);

var loginForm = t.struct(basicForm);

const options = {};

/** Class displays a happy message saying that deliverer's check in succeeded! **/
export default class LoginView extends Component {
  static navigationOptions = {
    title: "Login",
  };

  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    var value = this.refs.form.getValue();

    global.firebaseApp.auth().signInWithEmailAndPassword(
      value[EMAIL], value[PASSWORD]).then((userData, error) => {
        console.log("userData: " + JSON.stringify(userData));

        // login success!
        if(!error){
          
          // set as user
          global.userKey = userData["uid"];

          const { navigate } = this.props.navigation;
          navigate('MainTabNavigator');

        } else {
          alert(JSON.stringify(error.code));
        }
    });
  }

  register() {
    var value = this.refs.form.getValue();

    if (value[NAME] === null) {
      alert("Must input a name to register!");
    } else {
      global.firebaseApp.auth().createUserWithEmailAndPassword(
        value[EMAIL], value[PASSWORD]).then((userData, error) => {
          console.log("userData: " + JSON.stringify(userData));
          console.log("error: " + JSON.stringify(error));

          // register success!
          if(!error){
            alert("Your account was created!");

            console.log("userData[uid]: " + userData["uid"])

            // add user to database
            var newRef = global.firebaseApp.database().ref("users").child(userData["uid"]).set({
              email: value[EMAIL],
              name: value[NAME],
            });

            // set as user
            global.userKey = userData["uid"];
            console.log("newRef.key: " + global.userKey);

            const { navigate } = this.props.navigation;
            navigate('MainTabNavigator');

          } else {
            alert(error.code);
          }
      });
    }
  }

  render() {
    return(
      <View style={styles.form}>
        <Form
          ref="form"
          type={loginForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.login} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <Text></Text>
        <TouchableHighlight style={styles.button} onPress={this.register} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
      </View>
      );
  }
}