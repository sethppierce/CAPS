'use strict';

const { newOrder, deliveredThanks } = require('./index')
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

describe('VendorHandler', () => {
  test('Should create new order', () => {
    newOrder(event);
    expect(console.log).toHaveBeenCalled();
  });
  test('Thanks Driver', async () => {
    deliveredThanks(event);
    expect(console.log).toHaveBeenCalledWith('Thank you for delivering', event.payload.orderID);
  });
}); 