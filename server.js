// NODE MODULES
var express = require('express');
var hbs = require('express-handlebars');
var http = require('http');	
var mongoose = require('mongoose');
var twitter = require('twitter');

//  USER MODULES
var routes = require('./routes');
var streamHandler = require('./utils/streamHandler');
var config = require('./config');

// CONFIG SETUP
mongoose.connect('mongodb://localhost/node-react');
var twitterClient = new twitter(config.twitter);

// APP 
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');
app.disable('etag');

app.get('/',routes.index);
app.get('/pages/:page/:skip',routes.pages);

app.use("/", express.static(__dirname+"/public/"));

// HTTP Server
var server = http.createServer(app);
server.listen(port, function(){
 console.log("Express listening on port: "+port);
});

// SOCKET IO 
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
twitterClient.stream('statuses/filter',{track:'markets'}, function(stream){
	streamHandler(stream,io);
});