var express = require('express');
var path = require('path');
var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/feed', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    });
    res.write('\n');

    setInterval(function() {
        res.write("data: 1000\n\n");
    }, 1000);
});


app.listen(8080);