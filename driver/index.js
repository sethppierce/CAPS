'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

socket.emit('GET_PICKUP', 'pickUpQueue')

function driverHandler (payload){
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.payload.orderID}`)
      payload.event = 'In-Transit'
      payload.time = new Date()
    socket.emit('IN-TRANSIT', payload)
  }, 3000)
};

function driverDelivered(payload){
  setTimeout(() => {
    payload.event = 'Delivered'
    payload.time = new Date()
    console.log(`DRIVER: delivered ${payload.payload.orderID}`)
    socket.emit('DELIVERED', payload)
  }, 3000)
};


socket.on('PICKUP', driverHandler);
socket.on('IN-TRANSIT', driverDelivered);

module.exports = {driverHandler, driverDelivered}