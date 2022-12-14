'use strict';

const { driverHandler, driverDelivered } = require('./index')
const Chance = require('chance');
const chance = new Chance();
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

console.log = jest.fn();

const event = {
  event: 'ORDERIN',
  time: new Date(Date.now()),
  payload: {
    store: '1-206-flowers',
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  },
};

let io, serverSocket, clientSocket;

beforeAll((done) => {
  const httpServer = createServer();
  io = new Server(httpServer);
  httpServer.listen(() => {
    const port = httpServer.address().port;
    clientSocket = new Client(`http://localhost:${port}`);
    io.on("connection", (socket) => {
      serverSocket = socket;
    });
    clientSocket.on("connect", done);
  });
});

afterAll(() => {
  io.close();
  clientSocket.close();
});

describe('Driver Handler', () => {
  test('Driver picks up order', () => {
    driverHandler(event);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${event.payload.orderID}`);
  });
  test('Driver delivers order', () => {
    driverDelivered(event);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered ${event.payload.orderID}`);
  });
}); 