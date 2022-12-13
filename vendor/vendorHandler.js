'use strict';

let eventPool = require('../eventpool');

module.exports = (payload) => {
    console.log('New Order for Pickup', payload.payload.orderID);
    const event = {
      event: 'Picked-up',
      time: new Date(),
      payload: payload.payload,
    };
    console.log(event);
    eventPool.emit('PICKUP', event)
}