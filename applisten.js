var pg = require('pg');
conString = 'postgres://postgres:987521@localhost:5432/db-main';

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
    //client.connect();
    client.query('LISTEN count_changed');
    client.on('notification', function(data) {
        console.log(data.payload);
    });
});