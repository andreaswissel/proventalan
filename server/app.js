'use strict';

var restify = require('restify'),
    _ = require('lodash');

var app = restify.createServer({});

app.use(restify.CORS());
app.use(restify.fullResponse()).use(restify.bodyParser());

var clients = [],
    history = [],
    usernamesColorMap = [];

var colors = ['wheat', 'blueviolet', 'brown', 'cadetblue', 'cornflowerblue', 'coral', 'darkorchid', 'steelblue', 'royalblue'];

var io = require('socket.io').listen(app.server);

io.set('origins', '*:*');

io.sockets.on('connection', function(socket) {
  console.log('client connected ', socket.id);

  clients.push({ id: socket.id, socket: socket });

  socket.emit('history', history);

  socket.on('event', function(event) {
    parseEvent(event, socket);
  });

  socket.on('disconnect', function() {
    var index = _(clients).findIndex({ id: socket.id });
    clients.splice(index, 1);

    console.log('connected clients ', clients.length);
  });
});

function parseEvent(event, socket) {
  let type = event.type,
      data = event.data,
      id = socket.id;

  switch(type) {
    case 'msg':
      console.log('new message ', data);
      handleMessage(data, socket, id);
      break;
    case 'logon':
      console.log('user logged on ', data);
      socket.username = data;
      socket.color = colors[Math.floor(Math.random(10, 100)*10)];
      _.forEach(clients, function(client, key) {
        io.sockets.connected[client.socket.id].emit('clients', mapUserColors());
      });
      break;
  }
};

function handleMessage(message, socket, senderId) {
  history.push({ id: socket.id, message: message, username: socket.username})
  _.forEach(clients, function(client) {
    if(client.id !== senderId) {
      client.socket.emit('message', { id: socket.id, msg: message, username: socket.username });
    }
  })
};

function mapUserColors() {
  var colorMap = [];

  for(var i = 0; i < clients.length; i++) {
    colorMap.push({ username: clients[i].socket.username, color: clients[i].socket.color });
  }

  return colorMap;
};

app.get('/chat', function(req, res) {

});

app.listen(1337);