'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server(3001);

const caps = server.of('/caps')


caps.on('connection', (socket) => {
  console.log('connected to caps namespace', socket.id);

  socket.on('ORDERIN', (payload) => {
    console.log('message recieved', payload);

    socket.broadcast.emit('PICKUP', payload)
  });

  socket.on('IN-TRANSIT', (payload) => {
    console.log('message recieved', payload);

    socket.emit('IN-TRANSIT', payload)
  });

  socket.on('DELIVERED', (payload) => {
    console.log('message recieved', payload);

    socket.broadcast.emit('DELIVERED', payload)
  });

});