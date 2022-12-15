'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

socket.emit('JOIN', '1-206-flowers')
socket.emit('GET_DELIVERIES',{ queueId: '1-206-flowers'})

const Chance = require('chance');
const chance = new Chance();

function newOrder(){
  const event = {
    event: 'PICKUP',
    time: new Date(Date.now()),
    queueId: '1-206-flowers',
    packageId: chance.guid(),
    payload: {
      store: '1-206-flowers',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    },
  };
  console.log('New Order :', event.packageId);
  socket.emit('ORDERIN', event);
}


function recievedThanks(payload){
  payload.event = 'Recieved'
  payload.time = new Date()
  console.log(`Recieved confirmation for ${payload.packageId}`)
  socket.emit('COMPLETE', payload)
}

socket.on('RECIEVED', recievedThanks)

setInterval(() => {
  newOrder();
}, 8000);



module.exports = { newOrder }