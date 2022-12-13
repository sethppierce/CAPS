'use strict';

let eventPool = require('../eventpool');

module.exports = (payload) => {
    console.log(`DRIVER: picked up ${payload.payload.orderID}`)
    let event = {
      event: 'In-Transit',
      time: new Date(),
      payload: payload.payload,
    };
    console.log(event)
    eventPool.emit('IN-TRANSIT', event)
};