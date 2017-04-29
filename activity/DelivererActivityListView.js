import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView
} from 'react-native';

import RequestRow from './RequestRow';

// import style info
const styles = require('../styles/styles.js');

// icon for navigation bar
var navIcon = require("../chats-icon.png");

/** Class displays a happy message saying that deliverer's check in succeeded! **/
export default class DelivererActivityListView extends Component {
  static navigationOptions = {
    title: 'Activity',
    tabBarLabel: 'Activity',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={navIcon}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  constructor() {
    super();

    // prepare firebase items

    // look at all the checkins for the logged in user
    global.firebaseApp.database().ref("users/" + global.userKey + "/checkins").on('value', (checkinSnap)=>{
      var requestItems = [];
      checkinSnap.forEach((child)=>{
        var checkinKey = child.val()["checkin_key"];
        console.log("checkinKey: " + JSON.stringify(checkinKey));
       
        // for each checkin, look at all corresponding requests
        global.firebaseApp.database().ref("checkins/" + checkinKey + "/pending_requests").on('value', (requestSnap)=>{
          console.log("requestSnap: " + JSON.stringify(requestSnap.val()));
          requestSnap.forEach((child)=>{
            var requestWithFromInfo = child.val();
            requestWithFromInfo['key'] = child.key;
            console.log("request: " + JSON.stringify(requestWithFromInfo));
            requestItems.push(requestWithFromInfo);
            this.setState({
              dataSource: ds.cloneWithRows(requestItems),
            });
          });
        });
      });
    })

    // prepare list of CheckinRows
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  // renders a CheckinRow as each row
  renderRow = (data) => {
    return (
      <RequestRow
        data={data}
        onPress={()=>{
          const { navigate } = this.props.navigation;
          navigate('CheckinListView', { data: data});
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      </View>
    );
  }
}