var express = require('express');
var path = require('path');
var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

var lastConnectionId = 0;
var connections = {};

app.get('/feed', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    });
    res.write('\n');

    var id = ++lastConnectionId;
    connections[id] = res;

    req.on("close", function(){
        delete connections[id];
        console.log("client disconnected");
    });
});

setInterval(function() {
    for (var id in connections) {
        connections[id].write("data: 1000\n\n");
    }
}, 1000);


app.listen(8080);