import React from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, AppRegistry, Animated, Image, Easing } from 'react-native';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
/*var socket = require('socket.io');
import './UserAgent';*/
//import io from 'react-native-socketio';
//import {io} from 'react-native-socketio';
//import Orientation from 'react-native-orientation';*/
//var server = require('http').Server(app);
//var io = require('react-native-socketio')(server);
//import 'react-native-socketio';
//app.use(express.static('public'))
//app.get('/', function(req,res){
//	res.status(200).send()
//})
//import io from 'socket.io-client';
 
var socket = require('socket.io-client')('http://localhost:1234');


export default class App extends React.Component {

  state = {
    speed: 15,
    b: 0,
    f: 30
  } 

  needleRotate = function(options) {
    return {
      position: "absolute",
      top: 113,
      left: 65,
      width: 150,
      height: 150,
      transform: [{
        rotate: parseInt(Math.random()*360) + 'deg'
      }
      ]
    }
  }

  /*constructor() {

    onclick = () => {
      setInterval(function(){
        needle = function(options) {
          return {
            transform: [{
              rotate: '2deg'
            }
            ]
          }
        }
      },1000);
    }

  }*/
  constructor(){
    super()
    
    //this.socket = io('http://localhost:1234',{jsonp: false})
    //var socketConfig = { path: '/socket' };
    //var socket = new SocketIO('localhost:1234');
    var socket = require('socket.io-client')('http://localhost:1234');
    //socket.connect();
    socket.on('connect', function(){
      console.log('connected')
    });
    socket.on('mobile',() =>{
      console.log("recieving"),
      this.setState({speed: 40})
      //this.render()
      io.sockets.emit('mobile');
    })

    this.spinValue = new Animated.Value(0)
  }

  /*constructor(props){
    super(props);

    this.socket = io('http://localhost:6969',{jsonp: false});

    this.socket.on('update',() => {
      console.log("recieved"),
      this.setState({speed: "23"}
    )});

  }*/
/*constructor(){
  onLoad = () => {
    needle = function() {
      return {
        transform: [{
          rotate: '20deg'
        }
        ]
      }
    }
}
}*/
  componentDidMount(){
    this.spin()
  }

  spin () {
    this.spinValue.setValue(this.state.b)
    Animated.timing(
      this.spinValue,
      { 
        toValue: this.state.f,
        duration: 1000,
        //easing: Easing.linear,
        delay: 1000,
      }
    ).start(() => this.spin())
    this.state.b = this.state.b+10;
    if (this.state.b > 100)
    {
      this.state.b = 0;
    }
  }

  render() {
    var a = Math.random();
    var b = a;
    const spin = this.spinValue.interpolate({
      inputRange: [0,1,2,3,4,5,6,7,8,9,10],
      outputRange: ['10deg','20deg','30deg','40deg','50deg','60deg','70deg','80deg','90deg','100deg','110deg'],
    })
    return (
      <ImageBackground source={require('./assets/img/bg.jpg')} style={styles.container}>
        <View >
        <Image style={this.needleRotate()} source={require("./assets/img/needle3.png")}/>
        </View>
        <View>
        <Animated.Image style = {{
          position: "absolute",
          flex:1,
          top: 234,
          left: 117,
          width: 250,
          height: 250,
          transform: [{rotate: spin}]
        }} source={require("./assets/img/needle2.png")}/>
        </View>
        <GaugeProgress style = {styles.gauge1}
          size={180}
          width={10}
          fill={100}
          rotation={320}
          cropDegree={270}
          tintColor="#4682b4"
          delay={0}
          backgroundColor="#b0c4de"
          stroke={[2, 2]} //For a equaly dashed line
          strokeCap="butt" />

          <GaugeProgress style = {styles.gauge2}
          size={180}
          width={10}
          fill={100}
          rotation={230}
          cropDegree={270}
          tintColor="#ff0000"
          delay={0}
          backgroundColor="#ec6161"
          stroke={[2, 2]} //For a equaly dashed line
          strokeCap="butt" />

          <Text style={styles.speed}>{this.state.speed}</Text>
          <Text style={styles.rpm}>5200</Text>
          <Text style={styles.name}>Tushar</Text>
          <Text style={styles.temp}>23°C</Text>
          <Text style={styles.battery}>43%</Text>
          <Text style={styles.gear}>3</Text>
          <Text style={styles.laptime}>1:33:45</Text>
          <Text style={styles.lap}>13</Text>

        <StatusBar hidden />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    flex: 1,
  },
  /*needle: {
    position: "absolute",
    flex:1,
    top: 234,
    left: 117,
    width: 250,
    height: 250,
    transform: [{rotate: spin}]
    //transform: [{
    //  rotate: '5deg'
    //}
    //]
  },*/
  needle2: {
    position: "absolute",
    top: 113,
    left: 65,
    width: 150,
    height: 150,
    transform: [{
      rotate: '-165deg'
    }
    ]
  },
  gauge1:{
    position:"absolute",
    top:460,
    left:20
  },
  gauge2:{
    position:"absolute",
    top:460,
    left:80
  },
  speed:{
    color:'#ff0000',
    fontSize:20,
    position:'absolute',
    top:125,
    left:130,
    transform: [{
      rotate: '270deg'
    }
    ]
  },
  rpm:{
    color:'#ffffff',
    position:'absolute',
    top:350,
    left:290,
    transform: [{
      rotate: '270deg'
    }
    ]
  },
  name:{
    color:'#ffffff',position:'absolute',
    top:600,
    left:290,
    transform: [{
      rotate: '270deg'
    }
    ]
  },
  temp:{
    color:'#ffffff',
    position:'absolute',
    top:550,
    left:85,
    transform: [{
      rotate: '270deg'
    }
    ]
  },
  battery:{
    color:'#ffffff',
    position:'absolute',
    top:550,
    left:165,
    transform: [{
      rotate: '270deg'
    }
    ]
  },
  gear:{
    color:'#ffffff',
    position:'absolute',
    top:505,
    left:125,
    fontSize:50,
    transform: [{
      rotate: '270deg'
    }
    ]
  },
  laptime:{
    color:'#ffffff',
    position:'absolute',
    top:100,
    left:285,
    transform: [{
      rotate: '270deg'
    }
    ]
  },
  lap:{
    color:'#000000',
    position:'absolute',
    top:30,
    left:285,
    transform: [{
      rotate: '270deg'
    }
    ]
  },

});

//AppRegistry.registerHeadlessTask('Rotatejs', () => require('Rotatejs'));