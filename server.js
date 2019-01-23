var express = require('express');
var path = require('path');
var app = express();
var Connections = require('./connections.js');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

var connections = new Connections();

app.get('/feed', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    });
    res.write('\n');

    var id = connections.add(res);

    req.on("close", function(){
        connections.delete(id);
        console.log("client disconnected");
    });
});


function writeData(con, data) {
  con.write(`data: ${data}\n\n`);
}

setInterval(function() {
  console.log("Sending data to %s connections", connections.all().length)
  connections.all().forEach(function(con) {
    writeData(con, "1000");
  });
}, 1000);


var port = 8080;
app.listen(port, function() {
  console.log("Listening on http://localhost:%s", port);
});
