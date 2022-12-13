'use strict';

const eventPool = require('../eventpool');
const vendorHandler = require('./vendorHandler')
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

describe('Vendor Handler', () => {
  test('Vendor alerts new package to deliver', () => {
    vendorHandler(event);
    expect(console.log).toHaveBeenCalledWith('New Order for Pickup', event.payload.orderID);
  });
}); 