import {
  StyleSheet,
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },

  // these settings are for ListViews
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  // these settings are for buttons
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    width: width * 0.8,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  // these settings are generally for text
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  // these settings are for the navigation bar
  icon: {
    width: 26,
    height: 26,
  },
});

module.exports = styles