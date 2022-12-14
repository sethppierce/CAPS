'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
// socket.emit('JOIN', 'hub')

const Chance = require('chance');
const chance = new Chance();

function newOrder(){
  console.log('-------new order begins---------');
  const event = {
    event: 'PICKUP',
    time: new Date(Date.now()),
    payload: {
      store: '1-206-flowers',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    },
  };
  console.log(event);
  socket.emit('ORDERIN', event);
}

function deliveredThanks(payload){
  console.log('Thank you for delivering', payload.payload.orderID);
  process.exit();
}


setInterval(() => {
  newOrder();
}, 10000);


socket.on('DELIVERED', deliveredThanks )

module.exports = { newOrder, deliveredThanks }