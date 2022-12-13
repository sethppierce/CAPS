'use strict';

const eventPool = require('../eventpool');
const driverDelievered = require('./driverDelievered')
const Chance = require('chance');
const chance = new Chance();

jest.mock('../eventpool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

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

describe('Driver Delievered', () => {
  test('Delivers order', () => {
    driverDelievered(event);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered ${event.payload.orderID}`);
    expect(eventPool.emit).toHaveBeenCalled();
  });
}); 