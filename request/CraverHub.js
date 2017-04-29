import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  RefreshControl
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import CheckinRow from './CheckinRow';

// import style info
const styles = require('../styles/styles.js');

// icon for navigation bar
var navIcon = require("../chats-icon.png");

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
/** Displays a list of checked-in deliverers, so requesters can select one to request from. **/
export default class CraverHub extends Component {

  static navigationOptions = {
    title: 'Craver Hub',
    tabBarLabel: 'Craver Hub',
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

    // prepare list of CheckinRows
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    console.log("CraveHub userKey: " + global.userKey);
    if (global.userKey === null || global.userKey === undefined) {
      const { navigate } = this.props.navigation;
      navigate('LoginView');
    }

    else {
      // prepare firebase items
      global.firebaseApp.database().ref("checkins").on('value', (snapshot)=>{
        var checkinItems = [];
        snapshot.forEach((child)=>{
          var childWithKey = child.val();
          childWithKey['key'] = child.key;
          checkinItems.push(childWithKey);
        });
        this.setState({
          dataSource: ds.cloneWithRows(checkinItems),
        });
      });
    }
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
