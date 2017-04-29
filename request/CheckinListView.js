import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

// import style info
const styles = require('../styles/styles.js');

// set up delivery check-in form
var Form = t.form.Form;

// define the check-in form
var DESCRIBE_ORDER = "Describe your order";
var WHERE_TO = "Where do you want it delivered to?";

var basicForm = {}
basicForm[DESCRIBE_ORDER] = t.String;
basicForm[WHERE_TO] = t.String;

var requestForm = t.struct(basicForm);

var options = {}; // optional rendering options

/** Class shows a bunch of details about a checkin, and a request form **/
export default class CheckinListView extends Component {
  static navigationOptions = {
    title: "Make a Request",
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { params } = this.props.navigation.state;

    var value = this.refs.form.getValue();
    if (value) { 
      console.log(value);

      var newRef = global.firebaseApp.database().ref("checkins/" + params.data.key + "/pending_requests").push({
        "requester_id": global.userKey,
        "request_time": new Date().getTime(),
        "order_desc": value[DESCRIBE_ORDER],
        "to_name": value[WHERE_TO],
        "from_name": params.data.from_name,
        "to_coordinates": 0,
      });

      firebaseApp.database().ref("users/" + global.userKey + "/requests").push({
        "request_key": newRef.key,
      });

      const { navigate } = this.props.navigation;
      navigate('RequestSuccess');
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
      <Text style={styles.headerText}>From {params.data.from_name}</Text>
      <Text style={styles.headerText}>To {params.data.to_name}</Text>
      <Text></Text>
      <Text></Text>
        <Form
          ref="form"
          type={requestForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableHighlight>
      </View>
    );
  }
}