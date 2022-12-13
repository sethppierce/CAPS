'use strict';

const eventPool = require('../eventpool');
const vendorDelivered = require('./vendorDelivered')
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

describe('Vendor Delievered', () => {
  test('Vendor sends Thanks message', () => {
    vendorDelivered(event);
    expect(console.log).toHaveBeenCalledWith(' Thank you for delivering', event.payload.orderID);
  });
}); 