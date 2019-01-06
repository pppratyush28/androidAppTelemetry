'use strict';

var React = require('react-native');
var SocketIO = require('react-native-swift-socketio');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  TouchableWithoutFeedback
} = React;

class RNSwiftSocketIOTest extends Component{

  constructor () {
    this.socket = new SocketIO('localhost:1234', {});
    this.state = { status: 'Not connected' };
  }

  componentDidMount () {

    this.socket.on('mobile', () => {
      this.setState({
        status: 'Connected'
      });
    });

    this.socket.connect();
  }

  emitEvent () {
    this.socket.emit('mobille', {
      some: 'data'
    });
  }

  render () {
    return (
      <View style={styles.container}>

        <TouchableWithoutFeedback style={styles.btn} onPress={() => this.emitEvent()}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>
              Emit an event
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.status}>
          Connection status: {this.state.status}
        </Text>

      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  btn: {
    backgroundColor: '#4F67FF',
    padding: 30,
    borderRadius: 5
  },

  btnText: {
    color: '#fff'
  }
});

AppRegistry.registerComponent('RNSwiftSocketIOTest', () => RNSwiftSocketIOTest);