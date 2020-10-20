var pg = require ('pg');
var EventEmitter = require('events');
var util = require('util');
var pool = new pg.Pool();

var conString = "postgres://postgres:987521@localhost:5432/db-main";
var client = new pg.Client(conString);
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
})

// Build and instantiate our custom event emitter
function DbEventEmitter(){
    EventEmitter.call(this);
  }
util.inherits(DbEventEmitter, EventEmitter);
var dbEventEmitter = new DbEventEmitter();
// Define the event handlers for each channel name
dbEventEmitter.on('count_changed', (msg) => {
    // Custom logic for reacting to the event e.g. firing a webhook, writing a log entry etc
    console.log(msg['record']);
 
 //   console.log('Count changed: ' + JSON.stringify(msg));
  });
  client.on('notification', function(msg) {
    let payload = JSON.parse(msg.payload);
    dbEventEmitter.emit(msg.channel, payload);
    mes = msg;
  });
  
  // Designate which channels we are listening on. Add additional channels with multiple lines.
  client.query('LISTEN count_changed');

var WebSocketServer = require("ws").Server,
    express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app);


//server.listen(8000);
  server.listen(8000, 'localhost', () => {
  console.log('Server running at http://127.0.0.1:8000');


var wss = new WebSocketServer({server: server, path: "/ws"});

wss.on("connection", function(ws){
   console.log('connected');
   entry = 'Sie sind verbunden'
   dbEventEmitter.on('count_changed', (msg) => {
    // Custom logic for reacting to the event e.g. firing a webhook, writing a log entry etc
    entry = 'Count changed: ' + "id: "+msg["record"]["id"]+" new count: "+ msg["record"]["count"];
    entry =msg;
    ws.send(JSON.stringify(msg));
    console.log(JSON.stringify(msg));
   
 //   console.log('Count changed: ' + JSON.stringify(msg));
  });
   ws.send('Sie sind verbunden!!');
});});