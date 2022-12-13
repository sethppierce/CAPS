'use strict';

let eventPool = require('../eventpool');

module.exports = (payload) => {
  let event = {
    event: 'Delivered',
    time: new Date(),
    payload: payload.payload,
  };
  console.log(`DRIVER: delivered ${event.payload.orderID}`)
    console.log(event)
    eventPool.emit('DELIVERED', event)
};