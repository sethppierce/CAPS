'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const deliveredQueue = new Queue();
const pickUpQueue = new Queue();
const server = new Server(3001);
const caps = server.of('/caps')


caps.on('connection', (socket) => {
  console.log('connected to caps namespace', socket.id);

  socket.onAny((key, payload) =>{
    console.log('Package Update', payload)
  });

  socket.on('JOIN', (queueId) => {
    console.log('Rooms are ', socket.rooms)
    socket.join(queueId)
    socket.emit('JOIN', queueId)
    console.log(`You've joined the ${queueId} room`)
  });

  socket.on('ORDERIN', (payload) => {
    let currentPickQueue = pickUpQueue.read('pickUpQueue')
    if(!currentPickQueue){
      let queueKey = pickUpQueue.store('pickUpQueue', new Queue());
      currentPickQueue = pickUpQueue.read(queueKey);
    }
    currentPickQueue.store(payload.packageId, payload)
    socket.broadcast.emit('PICKUP', payload)
  });

  socket.on('IN-TRANSIT', (payload) => {
    let currentPickQueue = pickUpQueue.read('pickUpQueue');
    if(!currentPickQueue){
      throw new Error('no queue');
    }

    let order = currentPickQueue.remove(payload.packageId)

    socket.emit('IN-TRANSIT', order)
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = deliveredQueue.read(payload.queueId)
    if(!currentQueue){
      let queueKey = deliveredQueue.store(payload.queueId, new Queue());
      currentQueue = deliveredQueue.read(queueKey);
    }

    currentQueue.store(payload.packageId, payload)
    socket.to(payload.queueId).emit('RECIEVED', payload)
  });

  socket.on('COMPLETE', (payload) => {
    let currentQueue = deliveredQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue');
    }
    let order = currentQueue.remove(payload.packageId);
  });

  socket.on('GET_DELIVERIES', (payload) => {
    let currentQueue = deliveredQueue.read(payload.queueId)
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(packageId => {
        socket.emit('RECIEVED', currentQueue.read(packageId))
      })
    }
  });

  socket.on('GET_PICKUP', () => {
    let currentPickQueue = pickUpQueue.read('pickUpQueue');
    if(currentPickQueue && currentPickQueue.data){
      Object.keys(currentPickQueue.data).forEach(packageId => {
        socket.emit('PICKUP', currentPickQueue.read(packageId))
      })
    }
  });
});