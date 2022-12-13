'use strict';

const eventPool = require('../eventpool');
const driverHandler = require('./driverHandler')
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

describe('Driver Handler', () => {
  test('Driver picks up order', () => {
    driverHandler(event);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${event.payload.orderID}`);
    expect(eventPool.emit).toHaveBeenCalled();
  });
}); 