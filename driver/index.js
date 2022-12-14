'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
// socket.emit('JOIN', 'hub')

function driverHandler (payload){
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.payload.orderID}`)
    let event = {
      event: 'In-Transit',
      time: new Date(),
      payload: payload.payload,
    };
    socket.emit('IN-TRANSIT', event)
  }, 3000)
};

function driverDelivered(payload){
  setTimeout(() => {
    let event = {
      event: 'Delivered',
      time: new Date(),
      payload: payload.payload,
    };
    console.log(`DRIVER: delivered ${event.payload.orderID}`)
    socket.emit('DELIVERED', event)
  }, 3000)
};


socket.on('PICKUP', driverHandler);
socket.on('IN-TRANSIT', driverDelivered);

module.exports = {driverHandler, driverDelivered}