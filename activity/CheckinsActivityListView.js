import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView
} from 'react-native';

import CheckinRow from '../request/CheckinRow';

// import style info
const styles = require('../styles/styles.js');

// icon for navigation bar
var navIcon = require("../chats-icon.png");

/** Class displays a happy message saying that deliverer's check in succeeded! **/
export default class CheckinsActivityListView extends Component {
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
    global.firebaseApp.database().ref("users/" + global.userKey + "/checkins").on('value', (snapshot)=>{
      var checkinItems = [];
      console.log("snapshot: " + JSON.stringify(snapshot));
      snapshot.forEach((child)=>{
        console.log("child: " + JSON.stringify(child));
        var checkinKey = child.val().checkinKey;
        console.log("checkinKey: " + checkinKey);
        global.firebaseApp.database().ref("checkins/" + checkinKey).once('value').then((snap2)=>{
          var itemWithKey = snap2.val();
          itemWithKey['key'] = checkinKey;
          console.log("itemWithKey: " + JSON.stringify(itemWithKey));
          checkinItems.push(itemWithKey);
          this.setState({
            dataSource: ds.cloneWithRows(checkinItems),
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
      <CheckinRow
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