var express = require('express');
var path = require('path');
var app = express();
require('express-ws')(app);

var lastConnectionId = 0;
var connections = {};

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "wss.html"));
});

app.ws('/', function(ws, req){
  var id = ++lastConnectionId;
  connections[id] = ws;

  ws.on('close', function() {
    delete connections[id];
    console.log("client disconnected");
  });
});


setInterval(function(){
  for(var id in connections) {
    connections[id].send("1000");
  }
}, 1000);

app.listen(8080);