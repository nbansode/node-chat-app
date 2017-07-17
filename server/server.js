const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var publicPath = path.join(__dirname + '/../public');
console.log(publicPath);

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey.What is going on',
    createdAt: 123
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is set on port ${port}`);
});
