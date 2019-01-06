'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSimpleGauge = require('react-native-simple-gauge');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      speedo: 0,
      b: 0,
      b2: 0,
      rpm: 0,
      battery: 23,
      time: '0:00:00',
      temperature: 20,
      gear: 0,
      rotat: 20,
      rotat2: 23,
    };

    _this.needleRotate = function (options) {
      return {
        position: "absolute",
        top: 113,
        left: 65,
        width: 150,
        height: 150,
      };
    };

    _this.needleRotate2 = function (options) {
      return {
        position: "absolute",
        top: 113,
        left: 65,
        width: 150,
        height: 150,
      };
    };

    _this.spinValue = new _reactNative.Animated.Value(0);
    _this.spinValue2 = new _reactNative.Animated.Value(0);

    var socket = (0, _socket2.default)('http://192.168.43.61:3000');
    socket.on('mobile', function (rpy_json) {
      var arr = JSON.parse(rpy_json)
      var spd = arr.roll;
      var rp = arr.pitch
      _this.setState({ 
        speedo: spd,
        rpm: rp,
        temperature: spd,
        battery: spd });
    });
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.spin();
      this.spin2();
    }
  }, {
    key: 'spin',
    value: function spin() {
      var _this2 = this;

      this.spinValue.setValue(this.state.b);
      _reactNative.Animated.timing(this.spinValue, {
        toValue: this.state.rpm,
        duration: 100,
        delay: 100
      }).start(function () {
        return _this2.spin();
      });
      this.state.b = this.state.rpm;
    }
  }, {
    key: 'spin2',
    value: function spin2() {
      var _this3 = this;

      this.spinValue2.setValue(this.state.b2);
      _reactNative.Animated.timing(this.spinValue2, {
        toValue: this.state.speedo,
        duration: 100,
        delay: 100
      }).start(function () {
        return _this3.spin2();
      });
      this.state.b2 = this.state.speedo;
    }
  }, {
    key: 'render',
    value: function render() {
      var spin = this.spinValue.interpolate({
        //inputRange: [1000, 11000],
        inputRange: [0,360],
        outputRange: ['140deg', '400deg']
      });
      var spin2 = this.spinValue2.interpolate({
        //inputRange: [0, 115],
        inputRange: [0,360],
        outputRange: ['195deg', '468deg']
      });
      return _react2.default.createElement(
        _reactNative.ImageBackground,
        { source: require('./assets/img/bg.jpg'), style: styles.container },
        _react2.default.createElement(
          _reactNative.View,
          null,
          _react2.default.createElement(_reactNative.Animated.Image, { style: {
              position: "absolute",
              flex: 1,
              top: 234,
              left: 117,
              width: 250,
              height: 250,
              transform: [{ rotate: spin }]
            }, source: require("./assets/img/needle2.png") }),
          _react2.default.createElement(_reactNative.Animated.Image, { style: {
              position: "absolute",
              flex: 1,
              top: 113,
              left: 65,
              width: 150,
              height: 150,
              transform: [{ rotate: spin2 }]
            }, source: require("./assets/img/needle3.png") })
        ),
        _react2.default.createElement(_reactNativeSimpleGauge.GaugeProgress, { style: styles.gauge1,
          size: 180,
          width: 10,
          fill: 100,
          rotation: 300,
          cropDegree: (360 - (this.state.temperature*0.45)),
          tintColor: '#4682b4',
          delay: 0,
          backgroundColor: '#b0c4de',
          stroke: [2, 2] //For a equaly dashed line
          , strokeCap: 'butt' }),
        _react2.default.createElement(_reactNativeSimpleGauge.GaugeProgress, { style: styles.gauge2,
          size: 180,
          width: 10,
          fill: 100,
          rotation: 215,
          cropDegree: 360 - (this.state.battery*0.45),
          tintColor: '#ff0000',
          delay: 0,
          backgroundColor: '#ec6161',
          stroke: [2, 2] //For a equaly dashed line
          , strokeCap: 'butt' }),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.speed },
          this.state.speedo
        ),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.rpm },
          this.state.rpm
        ),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.name },
          'Tushar'
        ),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.temp },
          this.state.temperature
        ),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.battery },
          this.state.battery
        ),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.gear },
          this.state.gear
        ),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.laptime },
          this.state.time
        ),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.lap },
          'DR'
        ),
        _react2.default.createElement(_reactNative.StatusBar, { hidden: true })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;


var styles = _reactNative.StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1
  },

  gauge1: {
    position: "absolute",
    top: 460,
    left: 20
  },
  gauge2: {
    position: "absolute",
    top: 460,
    left: 80
  },
  speed: {
    color: '#ff0000',
    fontSize: 20,
    position: 'absolute',
    top: 125,
    left: 130,
    transform: [{
      rotate: '270deg'
    }]
  },
  rpm: {
    color: '#ffffff',
    fontSize: 20,
    position: 'absolute',
    top: 350,
    left: 300,
    transform: [{
      rotate: '270deg'
    }]
  },
  name: {
    color: '#ffffff', position: 'absolute',
    top: 600,
    left: 290,
    transform: [{
      rotate: '270deg'
    }]
  },
  temp: {
    color: '#ffffff',
    fontSize: 18,
    position: 'absolute',
    top: 560,
    left: 60,
    transform: [{
      rotate: '270deg'
    }]
  },
  battery: {
    color: '#ffffff',
    fontSize: 18,
    position: 'absolute',
    top: 570,
    left: 195,
    transform: [{
      rotate: '270deg'
    }]
  },
  gear: {
    color: '#ffffff',
    position: 'absolute',
    top: 505,
    left: 120,
    fontSize: 60,
    transform: [{
      rotate: '270deg'
    }]
  },
  laptime: {
    color: '#ffffff',
    position: 'absolute',
    top: 100,
    left: 285,
    transform: [{
      rotate: '270deg'
    }]
  },
  lap: {
    color: '#000000',
    position: 'absolute',
    top: 30,
    left: 285,
    transform: [{
      rotate: '270deg'
    }]
  }

});

//AppRegistry.registerHeadlessTask('Rotatejs', () => require('Rotatejs'));