'use strict';

const eventPool = require('./eventpool');
const Chance = require('chance');
const chance = new Chance();


const vendorHandler = require('./vendor/vendorHandler');
const driverHandler = require('./driver/driverHandler')
const vendorDelivered = require('./vendor/vendorDelivered');
const driverDelievered = require('./driver/driverDelievered');

eventPool.on('ORDERIN', vendorHandler);
eventPool.on('PICKUP', driverHandler);
eventPool.on('IN-TRANSIT', driverDelievered)
eventPool.on('DELIVERED', vendorDelivered);



setInterval(() => {
  console.log('-------new order begins---------');
  const event = {
    event: 'ORDERIN',
    time: new Date(Date.now()),
    payload: {
      store: chance.company(),
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    },
  };
  console.log(event);
  eventPool.emit('ORDERIN', event);
}, 8000);