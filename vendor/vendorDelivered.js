'use strict';

let eventPool = require('../eventpool');

module.exports = (payload) => {

    console.log(' Thank you for delivering', payload.payload.orderID);
}