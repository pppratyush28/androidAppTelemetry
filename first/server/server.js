var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, function(){
    console.log('listening for requests on port 3000');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    socket.on('imu', function(rpy_json){
        console.log("data recieved from python and sent to react");
        console.log(rpy_json);
        io.sockets.emit('mobile', rpy_json);
    });
});