/*
 * Server-side JS - Main file
 */

// Environment configurables
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var _fileindex = __dirname + '/public/index.html';

// Dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);
var speak = require("speakeasy-nlp");
//var fs = require('fs');
app.use(express.static(__dirname + '/public'));


// Globals
var twit = require('twit');
var keys = require(__dirname + '/.private/keys');
var twitter = new twit(keys);

// Listen to <port>
http.listen(port, ipaddress, function(){
    console.log('listening on ' + ipaddress + ':' + port);
});

// Route handler
app.get('/',function(req, res){
    res.sendfile(_fileindex);
});




// Request from twitter every 5secs
setInterval(function() {
    twitter.get('search/tweets', { q: 'banana since:2011-11-11 lang:en', count: 3 }, function(err, data, response) {
        //broadcast to all connected clients data.statuses
        //console.log(response);
        console.log('------- ' + Date() + ' -------\n');
        //console.dir(data.statuses);
        for (var i = data.statuses.length - 1; i >= 0; i--) {
            var result = speak.sentiment.analyze(data.statuses[i].text);
            console.log(data.statuses[i].text);
            console.log(result);
            console.log('\n');
        }
        console.log('\n');
    });
}, 5000);